
import { LevelType, Exercise } from './types';

export const ALL_EXERCISES: Record<LevelType, Exercise[]> = {
  [LevelType.NUMBERS_100]: [
    // Writing numbers from words to digits (Text Input as requested)
    { id: 'n100-w-d-1', question: 'כתוב בספרות את המספר: שבעים ושלוש', answer: '73', type: 'text-input' },
    { id: 'n100-w-d-2', question: 'כתוב בספרות את המספר: חמישים ושתיים', answer: '52', type: 'text-input' },
    { id: 'n100-w-d-3', question: 'כתוב בספרות את המספר: שמונים ושמונה', answer: '88', type: 'text-input' },
    { id: 'n100-w-d-4', question: 'כתוב בספרות את המספר: ארבעים וארבע', answer: '44', type: 'text-input' },
    { id: 'n100-w-d-5', question: 'כתוב בספרות את המספר: שישים ותשע', answer: '69', type: 'text-input' },
    
    // Writing numbers from digits to words
    { id: 'n100-d-w-1', question: 'כתוב במילים את המספר: 15', answer: 'חמש עשרה', type: 'text-input' },
    { id: 'n100-d-w-2', question: 'כתוב במילים את המספר: 42', answer: 'ארבעים ושתיים', type: 'text-input' },
    
    // Logic riddles
    { id: 'n100-logic-1', question: 'אני גדול מ-7 ב-1. מי אני?', answer: '8', type: 'text-input' },
    { id: 'n100-logic-2', question: 'אני קטן מ-30 ב-1. מי אני?', answer: '29', type: 'text-input' },
    { id: 'n100-logic-3', question: 'אני זוגי, גדול מ-10 וקטן מ-13. מי אני?', answer: '12', type: 'text-input' },
    
    // Sorting (Keep as multi-choice as it's a sorting task)
    { id: 'n100-sort-1', question: 'סדר מהקטן לגדול: 25, 32, 13', answer: '13, 25, 32', options: ['13, 25, 32', '32, 25, 13', '13, 32, 25'], type: 'multiple-choice' }
  ],
  [LevelType.NUMBERS_1000]: [
    { id: 'n1000-w-d-1', question: 'כתוב בספרות: שלוש מאות וחמש', answer: '305', type: 'text-input' },
    { id: 'n1000-w-d-2', question: 'כתוב בספרות: שבע מאות ושבע', answer: '707', type: 'text-input' },
    { id: 'n1000-w-d-3', question: 'כתוב בספרות: אלף', answer: '1000', type: 'text-input' },
    { id: 'n1000-logic-1', question: 'איזה מספר מורכב מ-4 מאות, 2 עשרות ו-9 יחידות?', answer: '429', type: 'text-input' },
    { id: 'n1000-logic-2', question: 'מי המספר העוקב (הבא אחרי) ל-499?', answer: '500', type: 'text-input' },
    { id: 'n1000-logic-3', question: 'מי המספר הקודם ל-700?', answer: '699', type: 'text-input' }
  ],
  [LevelType.ADD_SUB_20_CONV]: [
    { id: 'as20-1', question: '8 + 5 = ?', answer: '13', type: 'text-input' },
    { id: 'as20-2', question: '9 + 7 = ?', answer: '16', type: 'text-input' },
    { id: 'as20-3', question: '14 - 6 = ?', answer: '8', type: 'text-input' },
    { id: 'as20-4', question: '12 - 5 = ?', answer: '7', type: 'text-input' },
    { id: 'as20-5', question: '17 - 9 = ?', answer: '8', type: 'text-input' }
  ],
  [LevelType.ADD_SUB_100_NO_CONV]: [
    { id: 'as100-1', question: '40 + 20 = ?', answer: '60', type: 'text-input' },
    { id: 'as100-2', question: '55 + 13 = ?', answer: '68', type: 'text-input' },
    { id: 'as100-3', question: '87 - 30 = ?', answer: '57', type: 'text-input' },
    { id: 'as100-4', question: '99 - 44 = ?', answer: '55', type: 'text-input' }
  ],
  [LevelType.MISSING_NUMBERS]: [
    { id: 'miss-1', question: '5 + __ = 12', answer: '7', type: 'text-input' },
    { id: 'miss-2', question: '16 - __ = 9', answer: '7', type: 'text-input' },
    { id: 'miss-3', question: '20 - __ = 14', answer: '6', type: 'text-input' },
    { id: 'miss-4', question: '__ + 4 = 11', answer: '7', type: 'text-input' }
  ],
  [LevelType.INEQUALITIES]: [
    { id: 'ineq-1', question: '13 - 11 __ 1', answer: '>', options: ['>', '<', '='], type: 'multiple-choice' },
    { id: 'ineq-2', question: '5 + 3 __ 8', answer: '=', options: ['>', '<', '='], type: 'multiple-choice' },
    { id: 'ineq-3', question: '14 + 10 __ 25', answer: '<', options: ['>', '<', '='], type: 'multiple-choice' },
    { id: 'ineq-4', question: '50 - 5 __ 40', answer: '>', options: ['>', '<', '='], type: 'multiple-choice' }
  ],
  [LevelType.SEQUENCES]: [
    { id: 'seq-1', question: 'השלם את הסדרה: 5, 10, 15, 20, __', answer: '25', type: 'text-input' },
    { id: 'seq-2', question: 'השלם את הסדרה: 2, 4, 6, 8, __', answer: '10', type: 'text-input' },
    { id: 'seq-3', question: 'השלם את הסדרה: 100, 90, 80, 70, __', answer: '60', type: 'text-input' }
  ],
  [LevelType.WORD_PROBLEMS]: [
    // Direct from shopping image: Airplane(14), Truck(5), Tractor(7), Car(9)
    { id: 'word-1', question: 'כמה רון ישלם על מטוס (14 ש"ח) ומשאית (5 ש"ח)?', answer: '19', type: 'text-input' },
    { id: 'word-2', question: 'רון קנה שתי מכוניות (כל אחת 9 ש"ח). כמה שילם בסך הכל?', answer: '18', type: 'text-input' },
    { id: 'word-3', question: 'לאבא היו 40 ש"ח. הוא קנה שתי מכוניות (9 ש"ח כל אחת). כמה עודף קיבל?', answer: '22', type: 'text-input' },
    { id: 'word-4', question: 'האם רון יכול לקנות מטוס (14 ש"ח), משאית (5 ש"ח) וטרקטור (7 ש"ח) עם 30 ש"ח?', answer: 'כן', options: ['כן', 'לא'], type: 'multiple-choice' },
    { id: 'word-5', question: 'כמה עודף יקבל רון מ-50 ש"ח אם יקנה טרקטור (7 ש"ח)?', answer: '43', type: 'text-input' },
    
    // General verbal
    { id: 'word-6', question: 'בכיתה 20 תלמידים. 8 מהם בנים. כמה בנות יש בכיתה?', answer: '12', type: 'text-input' },
    { id: 'word-7', question: 'ליאו קרא 15 עמודים אתמול ו-10 עמודים היום. כמה עמודים קרא בסך הכל?', answer: '25', type: 'text-input' }
  ],
  [LevelType.GEOMETRY]: [
    { id: 'geo-1', question: 'כמה קודקודים יש למשולש?', answer: '3', type: 'text-input' },
    { id: 'geo-2', question: 'כמה צלעות יש למרובע?', answer: '4', type: 'text-input' },
    { id: 'geo-3', question: 'מה ההיקף של ריבוע שאורך הצלע שלו הוא 3 ס"מ?', answer: '12', type: 'text-input' },
    { id: 'geo-4', question: 'איזו צורה מורכבת מ-6 צלעות ו-6 קודקודים?', answer: 'משושה', options: ['משולש', 'ריבוע', 'מחומש', 'משושה'], type: 'multiple-choice' }
  ]
};
