import { CreateTable, CreateTableOptions } from "./CreateTable.use-case";

describe("CreateTableUseCase", () => {
    const createTableUseCase = new CreateTable();
    
    it("should instantiate a CreateTable class", () => {
        expect(createTableUseCase).toBeInstanceOf(CreateTable);
    })

    it("should create table with default values", ()=> {
        const tableOf2Rows = createTableUseCase.execute({ base: 2}).split("\n");
        expect(tableOf2Rows.length).toBe(10) 
        
     }); 

    it("should create table with custom values", () => {
        const customTableOptions: CreateTableOptions = {
            base: 10,
            limit: 15
        }

        const customTable = createTableUseCase.execute(customTableOptions);
        
        const customTableRows = customTable.split("\n");

        expect(customTableRows.length ).toBe(customTableOptions.limit);


    })

})