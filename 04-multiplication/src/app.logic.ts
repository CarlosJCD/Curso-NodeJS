import fs from "fs"

import { yarg as argv } from "./config/plugins/args.plugin";

const { b: baseNumber, l: tableLimit, s: showInConsole } = argv

const OUTPUT_DIR = "outputs";



createOutputFile(generateOutputFilePath(baseNumber), generateFileContent(baseNumber))


function generateOutputFilePath(baseNumber: number){
    return `${OUTPUT_DIR}/tablaDel${baseNumber}.txt`
}

function generateFileContent(baseNumber: number){
    let fileContent = `
======================================
        TABLA DEL ${baseNumber}
======================================
`
    for(let currentTableNumber = 1; currentTableNumber <= tableLimit; currentTableNumber++){
        fileContent += `${baseNumber} x ${currentTableNumber} = ${baseNumber * currentTableNumber}`
        
        fileContent += currentTableNumber === tableLimit ? "" : "\n";
    }
    return fileContent
}

function createOutputFile(filePath: string, fileContent: string){
    if(!fs.existsSync(OUTPUT_DIR)){
        createOutputDirectory();
    }

    fs.writeFile(filePath, fileContent, (error) => {
        if(error) console.error(error);
        else if(showInConsole) console.log(fileContent);
    })
}

function createOutputDirectory(){
    fs.mkdirSync(OUTPUT_DIR, { recursive: true});
}