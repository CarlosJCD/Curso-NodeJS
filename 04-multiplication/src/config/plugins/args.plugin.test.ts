
const runCommand = async (commandArgs: string[]) =>{
    process.argv = [...process.argv, ...commandArgs];

    const { yarg } = await import("./args.plugin");
    
    return yarg;
}

describe("ArgsPlugin", () => {
    const originalArgv = process.argv;
    
    beforeEach( () => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    it("should return default values", async() => {
        const argv = await runCommand(["-b","5"]);
        
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            d: 'outputs',
            n: 'table', 
        }));
        
    })

    it("should return configuration with custom values", async() => {
        const argv = await runCommand(["-b","10", "-l", "15", "-s", "true", "-d", "test", "-n", "test"]);
        
        expect(argv).toEqual(expect.objectContaining({
            b: 10,
            l: 15,
            s: true,
            d: 'test',
            n: 'test', 
        }));
        
    })
})