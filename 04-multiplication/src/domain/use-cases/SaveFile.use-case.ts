import fs from "fs";

export interface SaveFileUseCase {
    execute: ( options: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
    fileContent : string;
    destination?: string;
    fileName?   : string;
}

export class SaveFile implements SaveFileUseCase {
    /**
     * Dependency Injection
    */
    constructor(){}
    
    execute({
        fileContent, 
        destination = "outputs", 
        fileName = "table"
    }: SaveFileOptions): boolean {
        try {
            if(!fs.existsSync(destination)){
                fs.mkdirSync(destination, { recursive: true});
            }
            
            const filePath = `${destination}/${fileName}.txt` 
            
            fs.writeFileSync(filePath, fileContent)
            console.log("File Created At: " + filePath);
            return true;
        } catch (error) {
            // console.error(error)
            return false
        }

        
    }

}