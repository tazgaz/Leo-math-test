
export enum LevelType {
  NUMBERS_100 = 'NUMBERS_100',
  NUMBERS_1000 = 'NUMBERS_1000',
  ADD_SUB_20_CONV = 'ADD_SUB_20_CONV',
  ADD_SUB_100_NO_CONV = 'ADD_SUB_100_NO_CONV',
  MISSING_NUMBERS = 'MISSING_NUMBERS',
  INEQUALITIES = 'INEQUALITIES',
  SEQUENCES = 'SEQUENCES',
  WORD_PROBLEMS = 'WORD_PROBLEMS',
  GEOMETRY = 'GEOMETRY'
}

export interface Character {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface Level {
  id: LevelType;
  title: string;
  icon: string;
  unlocked: boolean;
  completed: boolean;
  color: string;
}

export interface Exercise {
  id: string;
  question: string;
  answer: string | number;
  options?: (string | number)[];
  type: 'multiple-choice' | 'text-input' | 'drag-drop';
  hint?: string;
  visualData?: any;
}

export interface GameState {
  coins: number;
  currentLevelId: LevelType | null;
  unlockedLevels: LevelType[];
  ownedCharacters: string[];
  selectedCharacterId: string;
}
