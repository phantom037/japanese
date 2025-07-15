// Hiragana characters and their romanized sounds
const hiraganaData = {
    // A row
    'あ': 'a',
    'い': 'i',
    'う': 'u',
    'え': 'e',
    'お': 'o',
    
    // K row
    'か': 'ka',
    'き': 'ki',
    'く': 'ku',
    'け': 'ke',
    'こ': 'ko',
    
    // S row
    'さ': 'sa',
    'し': 'shi',
    'す': 'su',
    'せ': 'se',
    'そ': 'so',
    
    // T row
    'た': 'ta',
    'ち': 'chi',
    'つ': 'tsu',
    'て': 'te',
    'と': 'to',
    
    // N row
    'な': 'na',
    'に': 'ni',
    'ぬ': 'nu',
    'ね': 'ne',
    'の': 'no',
    
    // H row
    'は': 'ha',
    'ひ': 'hi',
    'ふ': 'hu',
    'へ': 'he',
    'ほ': 'ho',
    
    // M row
    'ま': 'ma',
    'み': 'mi',
    'む': 'mu',
    'め': 'me',
    'も': 'mo'
};

// Convert to array for easier manipulation
const hiraganaArray = Object.entries(hiraganaData).map(([character, sound]) => ({
    character,
    sound
}));

// All possible sounds for generating wrong answers
const allSounds = Object.values(hiraganaData);