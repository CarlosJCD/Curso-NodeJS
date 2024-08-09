import { CreateTable } from "../domain/use-cases/CreateTable.use-case";
import { SaveFile } from "../domain/use-cases/SaveFile.use-case";
import { ServerApp } from "./ServerApp"

describe("ServerApp", () => {
    const serverApp = new ServerApp();
    
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-filename',
    };
    
    beforeEach( () => {
        jest.clearAllMocks();
    })

    it("should create a ServerApp instance", () => {
        expect(serverApp).toBeInstanceOf(ServerApp);
    })

    it('should run ServerApp with options', () => {

        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute' );
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );
    
        ServerApp.run(options);
    
    
        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({
          base: options.base, limit: options.limit
        });
    
        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            destination: options.fileDestination,
            fileName: options.fileName,
        });
    
    });

    it('should run with custom values mocked', () => {
    
        const createMock   = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(false);
    

        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
    
    
        ServerApp.run(options);
    
        expect( createMock ).toHaveBeenCalledWith({"base": options.base, "limit": options.limit });
        expect( saveFileMock ).toHaveBeenCalledWith({
          fileContent: '1 x 2 = 2',
          destination: options.fileDestination,
          fileName: options.fileName,
        });
    
    
      });
})