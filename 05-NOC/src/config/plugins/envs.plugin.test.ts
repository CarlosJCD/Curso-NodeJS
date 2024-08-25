import { envs } from "./envs.plugins"

describe("envs.plugin", () => {
    
    it("should return options", () => {
        console.log(envs)
        // A way to check envs without showing envs variable contents 
    })

    it("should throw error if envs not found", async() => {
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugins');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    })
})