
import { LevelType, Exercise } from './types';

export const ALL_EXERCISES: Record<LevelType, Exercise[]> = {
  [LevelType.NUMBERS_100]: [
    // Writing numbers from words to digits (Text Input as requested)
    { id: 'n100-w-d-1', question: 'כִּתְבוּ בִּסְפָרוֹת אֶת הַמִּסְפָּר: שִׁבְעִים וְשָׁלוֹשׁ', answer: '73', type: 'text-input' },
    { id: 'n100-w-d-2', question: 'כִּתְבוּ בִּסְפָרוֹת אֶת הַמִּסְפָּר: חֲמִשִּׁים וּשְׁתַּיִם', answer: '52', type: 'text-input' },
    { id: 'n100-w-d-3', question: 'כִּתְבוּ בִּסְפָרוֹת אֶת הַמִּסְפָּר: שְׁמוֹנִים וּשְׁמוֹנֶה', answer: '88', type: 'text-input' },
    { id: 'n100-w-d-4', question: 'כִּתְבוּ בִּסְפָרוֹת אֶת הַמִּסְפָּר: אַרְבָּעִים וְאַרְבַּע', answer: '44', type: 'text-input' },
    { id: 'n100-w-d-5', question: 'כִּתְבוּ בִּסְפָרוֹת אֶת הַמִּסְפָּר: שִׁשִּׁים וָתֵשַׁע', answer: '69', type: 'text-input' },

    // Writing numbers from digits to words
    { id: 'n100-d-w-1', question: 'כִּתְבוּ בְּמִילִּים אֶת הַמִּסְפָּר: 15', answer: 'חמש עשרה', type: 'text-input' },
    { id: 'n100-d-w-2', question: 'כִּתְבוּ בְּמִילִּים אֶת הַמִּסְפָּר: 42', answer: 'ארבעים ושתיים', type: 'text-input' },

    // Logic riddles
    { id: 'n100-logic-1', question: 'אֲנִי גָּדוֹל מ-7 בְּ-1. מִי אֲנִי?', answer: '8', type: 'text-input' },
    { id: 'n100-logic-2', question: 'אֲנִי קָטָן מ-30 בְּ-1. מִי אֲנִי?', answer: '29', type: 'text-input' },
    { id: 'n100-logic-3', question: 'אֲנִי זוּגִי, גָּדוֹל מ-10 וְקָטָן מ-13. מִי אֲנִי?', answer: '12', type: 'text-input' },

    // Sorting (Keep as multi-choice as it's a sorting task)
    { id: 'n100-sort-1', question: 'סַדְּרוּ מֵהַקָּטָן לַגָּדוֹל: 25, 32, 13', answer: '13, 25, 32', options: ['13, 25, 32', '32, 25, 13', '13, 32, 25'], type: 'multiple-choice' }
  ],
  [LevelType.NUMBERS_1000]: [
    { id: 'n1000-w-d-1', question: 'כִּתְבוּ בִּסְפָרוֹת: שְׁלוֹשׁ מֵאוֹת וְחָמֵשׁ', answer: '305', type: 'text-input' },
    { id: 'n1000-w-d-2', question: 'כִּתְבוּ בִּסְפָרוֹת: שֶׁבַע מֵאוֹת וְשֶׁבַע', answer: '707', type: 'text-input' },
    { id: 'n1000-w-d-3', question: 'כִּתְבוּ בִּסְפָרוֹת: אֶלֶף', answer: '1000', type: 'text-input' },
    { id: 'n1000-logic-1', question: 'אֵיזֶה מִסְפָּר מוּרְכָּב מ-4 מֵאוֹת, 2 עֲשָׂרוֹת וְ-9 יְחִידוֹת?', answer: '429', type: 'text-input' },
    { id: 'n1000-logic-2', question: 'מִי הַמִּסְפָּר הָעוֹקֵב (הַבָּא אַחֲרֵי) לְ-499?', answer: '500', type: 'text-input' },
    { id: 'n1000-logic-3', question: 'מִי הַמִּסְפָּר הַקּוֹדֵם לְ-700?', answer: '699', type: 'text-input' }
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
    { id: 'seq-1', question: 'הַשְׁלִימוּ אֶת הַסִּדְרָה: 5, 10, 15, 20, __', answer: '25', type: 'text-input' },
    { id: 'seq-2', question: 'הַשְׁלִימוּ אֶת הַסִּדְרָה: 2, 4, 6, 8, __', answer: '10', type: 'text-input' },
    { id: 'seq-3', question: 'הַשְׁלִימוּ אֶת הַסִּדְרָה: 100, 90, 80, 70, __', answer: '60', type: 'text-input' }
  ],
  [LevelType.WORD_PROBLEMS]: [
    { id: 'word-1', question: 'כַּמָּה רוֹן יְשַׁלֵּם עַל מָטוֹס (14 שַׁ"ח) וּמַשָּׂאִית (5 שַׁ"ח)?', answer: '19', type: 'text-input' },
    { id: 'word-2', question: 'רוֹן קָנָה שְׁתֵּי מְכוֹנִיּוֹת (כָּל אַחַת 9 שַׁ"ח). כַּמָּה שִׁילֵּם בְּסַךְ הַכֹּל?', answer: '18', type: 'text-input' },
    { id: 'word-3', question: 'לְאַבָּא הָיוּ 40 שַׁ"ח. הוּא קָנָה שְׁתֵּי מְכוֹנִיּוֹת (9 שַׁ"ח כָּל אַחַת). כַּמָּה עוֹדֶף קִיבֵּל?', answer: '22', type: 'text-input' },
    { id: 'word-4', question: 'הַאִם רוֹן יָכוֹל לִקְנוֹת מָטוֹס (14 שַׁ"ח), מַשָּׂאִית (5 שַׁ"ח) וְטְרַקְטוֹר (7 שַׁ"ח) עִם 30 שַׁ"ח?', answer: 'כן', options: ['כן', 'לא'], type: 'multiple-choice' },
    { id: 'word-5', question: 'כַּמָּה עוֹדֶף יְקַבֵּל רוֹן מ-50 שַׁ"ח אִם יִקְנֶה טְרַקְטוֹר (7 שַׁ"ח)?', answer: '43', type: 'text-input' },
    { id: 'word-6', question: 'בַּכִּתָּה 20 תַּלְמִידִים. 8 מֵהֶם בָּנִים. כַּמָּה בָּנוֹת יֵשׁ בַּכִּתָּה?', answer: '12', type: 'text-input' },
    { id: 'word-7', question: 'לִיאוֹ קָרָא 15 עַמּוּדִים אֶתְמוֹל וְ-10 עַמּוּדִים הַיּוֹם. כַּמָּה עַמּוּדִים קָרָא בְּסַךְ הַכֹּל?', answer: '25', type: 'text-input' }
  ],
  [LevelType.GEOMETRY]: [
    { id: 'geo-1', question: 'כַּמָּה קוֹדְקוֹדִים יֵשׁ לַמְּשׁוּלָּשׁ?', answer: '3', type: 'text-input' },
    { id: 'geo-2', question: 'כַּמָּה צְלָעוֹת יֵשׁ לַמְּרוּבָּע?', answer: '4', type: 'text-input' },
    { id: 'geo-3', question: 'מָה הַהֶיקֵּף שֶׁל רִיבּוּעַ שֶׁאוֹרֶךְ הַצֶּלַע שֶׁלּוֹ הוּא 3 ס"מ?', answer: '12', type: 'text-input' },
    { id: 'geo-4', question: 'אֵיזוֹ צוּרָה מוּרְכֶּבֶת מ-6 צְלָעוֹת וְ-6 קוֹדְקוֹדִים?', answer: 'משושה', options: ['משולש', 'ריבוע', 'מחומש', 'משושה'], type: 'multiple-choice' }
  ]
};
