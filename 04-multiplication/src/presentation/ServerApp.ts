import { CreateTable } from "../domain/use-cases/CreateTable.use-case";
import { SaveFile } from "../domain/use-cases/SaveFile.use-case";

interface RunOptions {
    base: number,
    limit: number,
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class ServerApp {
    static run({base, limit, showTable, fileDestination, fileName}: RunOptions){
        console.log("Server running...");
        const table = new CreateTable().execute({base, limit});

        const wasCreated = new SaveFile().execute({
            fileContent: table,
            destination: fileDestination ?? `outputs/table-${base}`,
            fileName: fileName ?? "table"
        })

        wasCreated ? console.log("File Created!") : console.error("File not created!");
        
        if (showTable) console.log(table);

        
    }
}