document.getElementById('extractBtn').addEventListener('click', function() {
    const text = document.getElementById('textInput').value;
    const keywords = extractKeywords(text);
    displayKeywords(keywords);
});

function extractKeywords(text) {
    // Remove pontuação e converte para minúsculas
    const cleanedText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toLowerCase();
    
    // Divide o texto em palavras
    const words = cleanedText.split(/\s+/);
    
    // Filtra palavras comuns (stop words)
    const stopWords = new Set(['o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob', 'sobre', 'que', 'e', 'ou', 'mas', 'se', 'como', 'quando']);
    
    const filteredWords = words.filter(word => 
        word.length > 3 && !stopWords.has(word)
    );
    
    // Conta a frequência das palavras
    const wordCount = {};
    filteredWords.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    
    // Ordena por frequência
    const sortedWords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);
    
    // Retorna as 20 palavras mais frequentes
    return sortedWords.slice(0, 20);
}

function displayKeywords(keywords) {
    const outputDiv = document.getElementById('keywordsOutput');
    outputDiv.innerHTML = '';
    
    keywords.forEach(keyword => {
        const keywordElement = document.createElement('span');
        keywordElement.className = 'keyword';
        keywordElement.textContent = keyword;
        outputDiv.appendChild(keywordElement);
    });
}

// Texto de exemplo com tema dos anos 1800
const exampleText = `A Revolução Industrial marcou profundamente o século XIX, trazendo máquinas a vapor, fábricas e locomotivas. A era vitoriana viu o surgimento de grandes invenções como o telégrafo e o fonógrafo. As damas usavam espartilhos e vestidos com crinolina, enquanto os cavalheiros preferiam cartolas e fraques. A literatura romântica floresceu com autores como Charles Dickens e Jane Austen. As cidades cresceram rapidamente, mas as condições dos trabalhadores eram muitas vezes deploráveis, levando ao surgimento dos primeiros movimentos sindicais.`;
document.getElementById('textInput').value = exampleText;
