export class CreateTodoDTO {
    private constructor(
        public readonly text: string 
    ){}

    static create( props: { [key : string]: any}): [string? ,CreateTodoDTO?] {
        
        const { text } = props

        return text 
                ? [undefined , new CreateTodoDTO(text)] 
                : ["Text property is required", undefined];
    }
}