import fs, { existsSync } from "fs";
import { SaveFile, SaveFileOptions } from "./SaveFile.use-case"

const OUTPUT_DIR = "outputs"
const DEFAULT_FILE_NAME = `table`;
const saveFileUseCase = new SaveFile();

const removeDirectory = (directoryPath: string) => { fs.rmSync(directoryPath , {recursive: true}) }

const createFileTest = (saveFileOptions: SaveFileOptions) => {
    const { fileContent, destination, fileName} = saveFileOptions;

    const filePath = `${destination ?? OUTPUT_DIR }/${ fileName ?? DEFAULT_FILE_NAME }.txt`

    const fileCreated = saveFileUseCase.execute(saveFileOptions);
    const fileExisting = fs.existsSync(filePath);
    const fileCreatedContent = fs.readFileSync(filePath, { encoding: "utf8"});

    expect(fileCreated).toBeTruthy();
    expect(fileExisting).toBeTruthy();
    expect(fileCreatedContent).toContain(fileContent);
}

describe("SaveFileUseCase", () => {

    afterEach( () => { 
        existsSync(OUTPUT_DIR) ?? removeDirectory(OUTPUT_DIR); 
    })

    it("should save file with default values", () => {
        const defaultValuesOptions: SaveFileOptions = {
            fileContent: "file content"
        };

        createFileTest(defaultValuesOptions);
        

    })

    it("should save file with default values", () => {
        const customFileOptions: SaveFileOptions = {
            fileContent: "10por10",
            destination: "test",
            fileName: "test"
        };

        createFileTest(customFileOptions);

        removeDirectory(`${customFileOptions.destination}/${customFileOptions.fileName}.txt`)
    })

    it("should return false if file not created", () => {
        const writeFileSpy = jest.spyOn(fs, "writeFileSync").mockImplementation(()=>{
           throw "This is a custom error message from testing" 
        });

        const fileCreated = saveFileUseCase.execute({fileContent: "test"});

        expect(fileCreated).toBeFalsy();

        writeFileSpy.mockRestore();

    })


})