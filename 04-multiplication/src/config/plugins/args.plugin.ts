import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
.option("b",{
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Multiplication table base"
})
.option("l",{
    alias: "limit",
    type: "number",
    default: 10,
    describe: "Multiplication table limit"
})
.option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "show multiplication table on console"
})
.option("d", {
    alias: "destination",
    type: "string",
    default: "outputs",
    describe: "Destination directory of the multiplication table file"
})
.option("n", {
    alias: "name",
    type: "string",
    default: "table",
    describe: "File name for the multiplication table file"
})
.check(validBaseNumber)
.parseSync()
  

function validBaseNumber(
    argv: yargs.Arguments<
                    { b: number; } & 
                    { l: number; } & 
                    {s: boolean;}>,
    options: { [alias: string]: string;}
): boolean{
    
    if(argv.b < 1) throw "Error: Base number must be greater than 0";

    return true
}