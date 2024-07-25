 
const { SHELL, HOMEBREW_PREFIX, npm_lifecycle_script } = process.env;


console.table({ SHELL, HOMEBREW_PREFIX, npm_lifecycle_script });

const characters = ["Superman", "Flash", "Batman"];

const [, , batman] = characters;

console.log(batman);