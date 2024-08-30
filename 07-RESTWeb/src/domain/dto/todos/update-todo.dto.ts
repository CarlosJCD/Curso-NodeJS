
export class UpdateTodoDTO {
    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values() {
        const returnObj: {[key: string]: any} = {};
    
        if ( this.text ) returnObj.text = this.text;
        if ( this.completedAt ) returnObj.completedAt = this.completedAt;
     
        return returnObj;
    }

    static create( props: { [key : string]: any}): [string? ,UpdateTodoDTO?] {
        
        const { id, text, completedAt } = props;

        let processedCompletedAt = completedAt;

        if ( !id || isNaN( Number(id)) ) return ['id must be a valid number', undefined];

        if(completedAt) {
            processedCompletedAt = new Date(completedAt)
            if(processedCompletedAt.toString() === 'Invalid Date') return ['CompletedAt must be a valid date', undefined]
        } 

        return [undefined, new UpdateTodoDTO(id, text, processedCompletedAt)]
    }
}