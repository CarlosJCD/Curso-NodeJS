const fs = require("fs");

const FILE_ROUTE= "./react-readme.md";

const content = fs.readFileSync(FILE_ROUTE , 'utf-8');

const contentWords =  content.split(" ");
const contentWordCount =  content.split(" ").length;

const reactWordCountInContent =  contentWords.reduce( (reactWordCounter, currentWord) => currentWord.toLowerCase().includes("react") ? reactWordCounter + 1 : reactWordCounter, 0 )

console.log("Numero de Palabras: " + contentWordCount);

console.log("Cantidad de veces que aparece la palabrs 'react': " + reactWordCountInContent);

