
interface BuildMakePersonOptions {
    getUUID: () => string,
    getAge: (birthdate: string) => number
}


interface PersonOptions {
    name: string, 
    birthdate: string
}

interface Person {
    id: string, 
    name: string, 
    birthdate: string, 
    age: number
} 


export const buildMakePerson = ( { getUUID , getAge }: BuildMakePersonOptions ) => {

    return ({ name, birthdate }: PersonOptions): Person => {
        return {
            id: getUUID(),
            name,
            birthdate,
            age: getAge(birthdate)
        } 
    }
}
