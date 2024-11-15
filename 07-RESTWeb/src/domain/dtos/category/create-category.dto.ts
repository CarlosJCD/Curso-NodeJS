
export class CreateCategoryDTO {
     
    private constructor(
        public readonly name: string,
        public readonly available: boolean 
    ){}

    static create( object: { [key:string]:any } ): [string?, CreateCategoryDTO?] {
        let { name, available = false } = object;

        if(!name) return ["Missing name for category"]; 
        if(typeof available !== "boolean") available = available === "true";

        return [undefined, new CreateCategoryDTO(name, available)];
    }
}