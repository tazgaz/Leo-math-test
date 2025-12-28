
import React from 'react';
import { CHARACTERS } from '../constants.tsx';
import { Character } from '../types';

interface ShopProps {
  coins: number;
  ownedIds: string[];
  selectedId: string;
  onBuy: (char: Character) => void;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const Shop: React.FC<ShopProps> = ({ coins, ownedIds, selectedId, onBuy, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 animate-in fade-in duration-300">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[95vh] overflow-y-auto p-6 shadow-2xl relative border-b-4 border-purple-200">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-3xl text-gray-300 hover:text-red-500 transition-colors"
        >
          ✖️
        </button>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-black text-purple-700">חנות 🏰</h2>
          <div className="bg-yellow-100 px-4 py-1.5 rounded-xl border-b-2 border-yellow-400 flex items-center shadow-sm">
            <span className="text-xl mr-2">🪙</span>
            <span className="text-xl font-black text-yellow-700">{coins}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {CHARACTERS.map((char) => {
            const isOwned = ownedIds.includes(char.id);
            const isSelected = selectedId === char.id;
            const canAfford = coins >= char.price;

            return (
              <div 
                key={char.id} 
                className={`
                    relative border-2 rounded-2xl p-4 flex flex-col items-center transition-all duration-300
                    ${isSelected ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-100 bg-gray-50/50'}
                `}
              >
                {!isOwned && !canAfford && (
                    <div className="absolute top-2 left-2 text-gray-400 text-xs">🔒</div>
                )}
                
                <div className={`
                    w-16 h-16 rounded-full mb-3 flex items-center justify-center text-4xl shadow-inner border-2
                    ${isSelected ? 'bg-white border-purple-200' : 'bg-white border-gray-100'}
                `}>
                  {char.image}
                </div>
                
                <h3 className="text-sm font-black text-gray-800 mb-1">{char.name}</h3>
                
                {isOwned ? (
                  <button
                    onClick={() => onSelect(char.id)}
                    className={`
                        w-full py-2 rounded-xl font-black text-xs transition-all border-b-2
                        ${isSelected ? 'bg-purple-600 text-white border-purple-800' : 'bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200'}
                    `}
                  >
                    {isSelected ? 'נבחר' : 'בחר'}
                  </button>
                ) : (
                  <button
                    onClick={() => onBuy(char)}
                    disabled={!canAfford}
                    className={`
                        w-full py-2 rounded-xl font-black text-xs transition-all border-b-2 flex items-center justify-center
                        ${canAfford ? 'bg-yellow-500 text-white border-yellow-700 hover:bg-yellow-600' : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'}
                    `}
                  >
                    🪙 {char.price}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
