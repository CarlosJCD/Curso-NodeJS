
export interface CreateTableOptions {
    base: number,
    limit?: number
}

export interface CreateTableUseCase {
    execute: ( optiones: CreateTableOptions ) => string;
}

export class CreateTable implements CreateTableUseCase {
    constructor(){

    }

    execute( { base, limit = 10 }: CreateTableOptions ){
        let fileContent = "";
        for(let currentTableNumber = 1; currentTableNumber <= limit; currentTableNumber++){
            fileContent += `${base} x ${currentTableNumber} = ${base * currentTableNumber}`
            
            fileContent += currentTableNumber === limit ? "" : "\n";
        }
        return fileContent;
    }
}
