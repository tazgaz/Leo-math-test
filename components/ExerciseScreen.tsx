
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { Exercise, LevelType } from '../types';
import { ALL_EXERCISES } from '../exerciseData';

// Helper for decoding base64 to bytes
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper for decoding raw PCM data
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface ExerciseScreenProps {
  levelId: LevelType;
  onComplete: (score: number) => void;
  onBack: () => void;
}

const ExerciseScreen: React.FC<ExerciseScreenProps> = ({ levelId, onComplete, onBack }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputAnswer, setInputAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const pool = ALL_EXERCISES[levelId] || [];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    
    setExercises(selected);
    setLoading(false);

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [levelId]);

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const playSoundEffect = (type: 'success' | 'error') => {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  };

  const speakText = async (text: string) => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }, 
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const ctx = initAudio();
        const audioBuffer = await decodeAudioData(decodeBase64(base64Audio), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start();
        return new Promise<void>((resolve) => {
          source.onended = () => resolve();
        });
      }
    } catch (error) {
      console.error("TTS Error:", error);
    }
  };

  const speakQuestion = async (text: string) => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    await speakText(`קרא בקול ברור לילד: ${text}`);
    setIsSpeaking(false);
  };

  const handleAnswer = async (ans: string) => {
    if (showFeedback) return;

    const current = exercises[currentIndex];
    const normalizedUserAns = ans.trim();
    const normalizedCorrectAns = current.answer.toString().trim();
    
    const isCorrect = normalizedUserAns === normalizedCorrectAns;
    
    setShowFeedback(isCorrect ? 'correct' : 'wrong');
    playSoundEffect(isCorrect ? 'success' : 'error');

    if (isCorrect) {
      setScore(prev => prev + 10);
      speakText("נהדר! כל הכבוד!");
    } else {
      speakText(`אוי, לא נורא. התשובה הנכונה היא ${current.answer}`);
    }

    setTimeout(() => {
      setShowFeedback(null);
      setInputAnswer('');
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onComplete(score + (isCorrect ? 10 : 0));
      }
    }, 2200);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-lg font-bold text-blue-600">טוען את הממלכה...</p>
      </div>
    );
  }

  const current = exercises[currentIndex];

  return (
    <div className={`max-w-xl mx-auto p-4 bg-white rounded-2xl shadow-xl relative overflow-hidden min-h-[400px] transition-all duration-500 ${
      showFeedback === 'correct' ? 'ring-[30px] ring-green-400/60 shadow-[0_0_150px_rgba(34,197,94,1)]' : 
      showFeedback === 'wrong' ? 'ring-[30px] ring-red-500/60 shadow-[0_0_150px_rgba(239,68,68,1)] animate-shake' : ''
    }`}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-15px); }
          40% { transform: translateX(15px); }
          60% { transform: translateX(-15px); }
          80% { transform: translateX(15px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out 0s 1;
        }
        .text-glow-green {
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(34, 197, 94, 0.8);
        }
        .text-shadow-red {
          text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
        }
        .shadow-success-icon {
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 1)) drop-shadow(0 10px 10px rgba(0, 0, 0, 0.3));
        }
        .shadow-fail-icon {
          filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0.5));
        }
      `}</style>

      {showFeedback === 'correct' && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-300">
          <span className="text-[140px] mb-2 shadow-success-icon transform scale-110 animate-pulse">🌟</span>
          <h2 className="text-6xl font-black text-white mb-2 text-glow-green">נהדר!</h2>
          <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/30 shadow-2xl">
            <p className="text-white text-3xl font-black">+10 מטבעות 🪙</p>
          </div>
        </div>
      )}
      
      {showFeedback === 'wrong' && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-700 to-rose-900 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-300">
          <span className="text-[140px] mb-2 shadow-fail-icon">💥</span>
          <h2 className="text-6xl font-black text-white mb-6 text-center px-4 text-shadow-red">נסה שוב!</h2>
          <div className="bg-white text-red-700 px-10 py-5 rounded-[2.5rem] text-4xl font-black shadow-[0_20px_50px_rgba(0,0,0,0.4)] border-4 border-red-200 transform hover:scale-105 transition-transform">
             {current.answer}
          </div>
          <p className="text-red-100 mt-8 text-2xl font-bold opacity-80">לא מוותרים, ליאו איתך!</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <button onClick={onBack} className="text-gray-400 hover:text-red-500 text-sm font-bold transition-colors">✖️ יציאה</button>
        <div className="flex flex-col items-center">
            <div className="w-40 h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-200">
                <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                    style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
                ></div>
            </div>
            <span className="text-[12px] text-blue-500 mt-1 font-black">{currentIndex + 1} / {exercises.length}</span>
        </div>
        <div className="flex items-center bg-yellow-50 px-3 py-1.5 rounded-xl border-2 border-yellow-200 shadow-sm">
            <span className="text-sm mr-1">🪙</span>
            <span className="text-sm font-black text-yellow-700">{score}</span>
        </div>
      </div>

      <div className="text-center py-2">
        <div className="flex flex-col items-center gap-4 mb-6">
          <h2 className="text-3xl font-black text-blue-900 leading-tight min-h-[80px] flex items-center justify-center px-2 drop-shadow-sm">
            {current.question}
          </h2>
          <button 
            onClick={() => speakQuestion(current.question)}
            disabled={isSpeaking || !!showFeedback}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-sm transition-all shadow-md border-b-4 ${
              isSpeaking ? 'bg-blue-100 text-blue-400 border-blue-200 translate-y-1' : 'bg-white text-blue-600 hover:bg-blue-50 border-blue-100 active:translate-y-1'
            }`}
          >
            {isSpeaking ? '🔊 מקשיבים...' : '🔈 הקרא לי'}
          </button>
        </div>
        
        {current.type === 'multiple-choice' && current.options && (
          <div className="grid grid-cols-2 gap-4">
            {current.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={!!showFeedback}
                onClick={() => handleAnswer(opt.toString())}
                className={`
                    py-5 px-3 rounded-[1.5rem] text-xl font-black transition-all transform hover:scale-[1.03] active:scale-95 shadow-lg border-b-4
                    ${showFeedback ? 'opacity-50 grayscale' : 'bg-white text-blue-800 border-blue-200 hover:border-blue-400 hover:bg-blue-50 active:translate-y-1'}
                `}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {current.type === 'text-input' && (
          <div className="flex flex-col items-center">
            <input
              type="text"
              autoFocus
              value={inputAnswer}
              disabled={!!showFeedback}
              onChange={(e) => setInputAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnswer(inputAnswer)}
              className="border-4 border-blue-100 rounded-3xl p-5 text-4xl text-center w-full max-w-xs focus:border-blue-500 focus:ring-8 focus:ring-blue-100 outline-none mb-6 shadow-2xl font-black text-blue-900 transition-all"
              placeholder="כתוב כאן..."
            />
            <button
              disabled={!!showFeedback || !inputAnswer}
              onClick={() => handleAnswer(inputAnswer)}
              className={`
                px-14 py-5 rounded-[2.5rem] text-3xl font-black shadow-[0_15px_30px_rgba(0,0,0,0.2)] transition-all transform active:scale-95 border-b-8 active:border-b-4 active:translate-y-1
                ${!inputAnswer || showFeedback ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600 border-green-700'}
              `}
            >
              בדיקה 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseScreen;
