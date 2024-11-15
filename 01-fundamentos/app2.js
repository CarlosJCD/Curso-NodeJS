const fs = require("fs");

const FILE_ROUTE= "./react-readme.md";

const data = fs.readFileSync(FILE_ROUTE , 'utf-8');

const newData = data.replace(/React/ig, 'Angular');

fs.writeFileSync("angular-readme.md", newData);

console.log(data);

