const fs = require('fs');

// Load the DanishWords.json file
const filePath = './DanishWords.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Get a random word
function getRandomWord() {
  const words = data.words;
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Display the random word
const randomWord = getRandomWord();
console.log(`Danish Word: ${randomWord.targetWord}`);
console.log(`English Translation: ${randomWord.englishWord}`);