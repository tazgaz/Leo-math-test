
import { LevelType, Character, Level } from './types';

export const INITIAL_LEVELS: Level[] = [
  { id: LevelType.NUMBERS_100, title: 'המספרים עד 100', icon: '🔢', unlocked: true, completed: false, color: 'bg-blue-500' },
  { id: LevelType.ADD_SUB_20_CONV, title: 'חיבור וחיסור עד 20', icon: '➕', unlocked: false, completed: false, color: 'bg-green-500' },
  { id: LevelType.NUMBERS_1000, title: 'המספרים עד 1,000', icon: '🏛️', unlocked: false, completed: false, color: 'bg-purple-500' },
  { id: LevelType.ADD_SUB_100_NO_CONV, title: 'חיבור וחיסור עד 100', icon: '➖', unlocked: false, completed: false, color: 'bg-pink-500' },
  { id: LevelType.MISSING_NUMBERS, title: 'נעלמים והשוואה', icon: '🔍', unlocked: false, completed: false, color: 'bg-yellow-500' },
  { id: LevelType.INEQUALITIES, title: 'גדול/קטן/שווה', icon: '⚖️', unlocked: false, completed: false, color: 'bg-orange-500' },
  { id: LevelType.SEQUENCES, title: 'סדרות מספרים', icon: '🛤️', unlocked: false, completed: false, color: 'bg-indigo-500' },
  { id: LevelType.WORD_PROBLEMS, title: 'בעיות מילוליות', icon: '📖', unlocked: false, completed: false, color: 'bg-red-500' },
  { id: LevelType.GEOMETRY, title: 'גיאומטריה ומדידות', icon: '📐', unlocked: false, completed: false, color: 'bg-teal-500' },
];

export const CHARACTERS: Character[] = [
  { id: 'char1', name: 'ליאו החכם', price: 0, image: '🦖', description: 'החבר הראשון שלך למסע' },
  { id: 'char2', name: 'רובובוט', price: 1500, image: '🤖', description: 'מומחה למספרים מתקדמים' },
  { id: 'char3', name: 'חתול המספרים', price: 3000, image: '🐱', description: 'זריז בחישובים' },
  { id: 'char4', name: 'אשף החישובים', price: 5000, image: '🧙‍♂️', description: 'קסם של מתמטיקה' },
  { id: 'char5', name: 'חד-קרן הקסם', price: 8000, image: '🦄', description: 'בעלת כוחות גיאומטריים' },
  { id: 'char6', name: 'דרקון האש', price: 12000, image: '🐲', description: 'מאסטר ממלכת המספרים' },
  { id: 'char7', name: 'אלופת ה-100', price: 18000, image: '🥇', description: 'האלופה שתמיד מקבלת 100!' },
  { id: 'char8', name: 'אלוף האלופים', price: 25000, image: '👑', description: 'התלמיד הכי מצטיין בממלכה' },
];
