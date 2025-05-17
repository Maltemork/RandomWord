// Fetch the JSON file and display a random word
fetch('./DanishWords.json')
  .then(response => response.json())
  .then(data => {
    const words = data.words;
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    // Update the HTML content with the random word
    document.getElementById('danish-word').textContent = randomWord.targetWord;
    document.getElementById('danish-word').setAttribute('href', `https://en.bab.la/dictionary/danish-english/${randomWord.targetWord.toLowerCase()}`);
    document.getElementById('english-word').textContent = randomWord.englishWord;

    // Fetch the English definitions of the word
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord.englishWord}`;
    return fetch(apiUrl);
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Definitions not found');
    }
    return response.json();
  })
  .then(definitionData => {
    // Extract and display all definitions
    const meanings = definitionData[0]?.meanings || [];
    const definitionList = document.createElement('ol');
    definitionList.innerHTML = `<strong>Definitions:</strong>`;

    meanings.forEach(meaning => {
      meaning.definitions.forEach(def => {
        const listItem = document.createElement('li');
        listItem.textContent = def.definition;
        definitionList.appendChild(listItem);
      });
    });

    document.getElementById('word-container').appendChild(definitionList);
  })
  .catch(error => {
    console.error('Error fetching the definitions:', error);
    const errorContainer = document.createElement('p');
    errorContainer.innerHTML = `<strong>Definitions:</strong> Unable to fetch definitions.`;
    document.getElementById('word-container').appendChild(errorContainer);
  });