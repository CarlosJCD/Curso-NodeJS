import { characters } from "../../src/js-foundation/02-destructuring"

describe("js-foundations/02-destructuring.ts", () => {
    test("characters should contain Flash and Superman", () => {
        expect(characters).toContain("Superman")
        expect(characters).toContain("Flash")
    })
    
    test("characters array should contain first Flash and second Superman", () => {
        const [ firstCharacter, secondCharacter ] = characters;

        expect(firstCharacter).toBe("Flash");
        expect(secondCharacter).toBe("Superman");
    })
})