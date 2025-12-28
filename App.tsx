
import React, { useState, useEffect, useMemo } from 'react';
import { LevelType, GameState, Level, Character } from './types';
import { INITIAL_LEVELS, CHARACTERS } from './constants.tsx';
import ExerciseScreen from './components/ExerciseScreen';
import Shop from './components/Shop';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('math_kingdom_state');
    if (saved) return JSON.parse(saved);
    return {
      coins: 50,
      currentLevelId: null,
      unlockedLevels: [LevelType.NUMBERS_100],
      ownedCharacters: ['char1'],
      selectedCharacterId: 'char1'
    };
  });

  const [levels, setLevels] = useState<Level[]>(() => {
    const saved = localStorage.getItem('math_kingdom_levels');
    if (saved) return JSON.parse(saved);
    return INITIAL_LEVELS;
  });

  const [showShop, setShowShop] = useState(false);

  useEffect(() => {
    localStorage.setItem('math_kingdom_state', JSON.stringify(gameState));
  }, [gameState]);

  useEffect(() => {
    localStorage.setItem('math_kingdom_levels', JSON.stringify(levels));
  }, [levels]);

  const handleLevelSelect = (levelId: LevelType) => {
    const level = levels.find(l => l.id === levelId);
    if (level?.unlocked) {
      setGameState(prev => ({ ...prev, currentLevelId: levelId }));
    }
  };

  const handleLevelComplete = (earnedCoins: number) => {
    const currentIndex = levels.findIndex(l => l.id === gameState.currentLevelId);
    
    const newLevels = [...levels];
    newLevels[currentIndex].completed = true;
    
    const bonus = (currentIndex + 1) * 5;
    const totalEarned = earnedCoins + bonus;

    if (currentIndex < levels.length - 1) {
      newLevels[currentIndex + 1].unlocked = true;
    }

    setLevels(newLevels);
    setGameState(prev => ({
      ...prev,
      coins: prev.coins + totalEarned,
      currentLevelId: null,
      unlockedLevels: newLevels.filter(l => l.unlocked).map(l => l.id)
    }));
  };

  const buyCharacter = (char: Character) => {
    if (gameState.coins >= char.price) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - char.price,
        ownedCharacters: [...prev.ownedCharacters, char.id],
        selectedCharacterId: char.id
      }));
    }
  };

  const selectedChar = useMemo(() => 
    CHARACTERS.find(c => c.id === gameState.selectedCharacterId) || CHARACTERS[0],
    [gameState.selectedCharacterId]
  );

  const characterPosIndex = useMemo(() => {
    return levels.reduce((acc, level, idx) => level.unlocked ? idx : acc, 0);
  }, [levels]);

  const progressPercentage = useMemo(() => {
    const completed = levels.filter(l => l.completed).length;
    return Math.round((completed / levels.length) * 100);
  }, [levels]);

  return (
    <div className="min-h-screen bg-sky-50 pb-12 overflow-x-hidden font-['Assistant']">
      <header className="bg-white shadow-md p-2 sticky top-0 z-40 flex justify-between items-center border-b-2 border-blue-100">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-1.5 rounded-xl border-b-2 border-yellow-700 flex items-center shadow-sm">
            <span className="text-xl mr-1">🪙</span>
            <span className="text-xl font-black text-white">{gameState.coins}</span>
          </div>
          <button 
            onClick={() => setShowShop(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-xl font-black text-sm border-b-2 border-purple-800 transition-all shadow-sm"
          >
            🏰 חנות
          </button>
        </div>
        
        <div className="text-2xl font-black text-blue-700 hidden sm:block">
            ב2 האלופים 🏆
        </div>
        
        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-blue-100 shadow-sm">
          <span className="text-sm font-black text-blue-800 hidden md:inline">{selectedChar?.name}</span>
          <div className="w-9 h-9 bg-blue-100 rounded-full border border-blue-300 flex items-center justify-center text-xl shadow-inner">
            {selectedChar?.image}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-5xl">
        {gameState.currentLevelId ? (
          <ExerciseScreen 
            levelId={gameState.currentLevelId} 
            onComplete={handleLevelComplete}
            onBack={() => setGameState(prev => ({ ...prev, currentLevelId: null }))}
          />
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h1 className="text-5xl sm:text-7xl font-black text-blue-900 mb-2 leading-tight drop-shadow-sm">
                ב2 האלופים
              </h1>
              <p className="text-blue-600 font-bold text-xl mb-4">המסע לציון 100 במבחן!</p>
              <div className="flex items-center justify-center gap-3">
                 <div className="w-48 h-4 bg-gray-200 rounded-full overflow-hidden border border-blue-100 shadow-inner">
                    <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-green-400 transition-all duration-1000" 
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                 </div>
                 <span className="text-blue-700 font-black">ציון נוכחי: {progressPercentage}</span>
              </div>
            </div>

            <div className="relative w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 lg:gap-6">
                {levels.map((level, index) => {
                    const isFurthestUnlocked = index === characterPosIndex;
                    return (
                        <div key={level.id} className="relative">
                            {isFurthestUnlocked && (
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce duration-1000">
                                    <div className="w-12 h-12 rounded-full border-2 border-yellow-400 bg-white shadow-lg flex items-center justify-center text-2xl ring-4 ring-blue-400 ring-opacity-10">
                                        {selectedChar.image}
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => handleLevelSelect(level.id)}
                                className={`
                                    w-full relative group p-4 rounded-2xl transition-all transform hover:scale-105 active:scale-95 border-b-4
                                    ${level.unlocked ? 'shadow-md cursor-pointer ' + level.color + ' border-black/10' : 'bg-gray-300 cursor-not-allowed grayscale border-gray-400'}
                                    ${level.completed ? 'ring-4 ring-green-400/30' : ''}
                                `}
                            >
                                <div className="text-5xl mb-2 transition-transform group-hover:scale-110 drop-shadow-md">{level.icon}</div>
                                <h3 className={`text-lg font-black leading-tight ${level.unlocked ? 'text-white' : 'text-gray-500'}`}>{level.title}</h3>
                                
                                <div className="mt-4 flex justify-center">
                                    {level.completed ? (
                                    <div className="flex items-center bg-white text-green-600 px-3 py-1 rounded-xl text-xs font-black shadow-sm">
                                        ⭐ הושלם
                                    </div>
                                    ) : level.unlocked ? (
                                    <div className="bg-white text-blue-600 bg-opacity-95 px-3 py-1 rounded-xl text-xs font-black shadow-sm">
                                        התחל מבחן 🚩
                                    </div>
                                    ) : (
                                    <div className="flex items-center text-gray-600 font-black text-xs">
                                        🔒 נעול
                                    </div>
                                    )}
                                </div>
                            </button>
                        </div>
                    );
                })}
                </div>
            </div>
          </div>
        )}
      </main>

      {showShop && (
        <Shop 
          coins={gameState.coins}
          ownedIds={gameState.ownedCharacters}
          selectedId={gameState.selectedCharacterId}
          onBuy={buyCharacter}
          onSelect={(id) => setGameState(prev => ({ ...prev, selectedCharacterId: id }))}
          onClose={() => setShowShop(false)}
        />
      )}
    </div>
  );
};

export default App;
