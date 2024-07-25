/**
 * 
 * @param {{getUUID: () => string, getAge: (birthdate: string) => string} } personDependencies 
 * 
 * 
 */
const buildMakePerson = ( { getUUID, getAge } ) => {
    
    /**
     * @param {{name: string, birthdate: string}}
     * 
     * @return { {id: string, name: string, birthdate: string, age: number} }
     */
    return ({ name, birthdate }) => {
        return {
            id: getUUID(),
            name,
            birthdate,
            age: getAge(birthdate)
        }
    }
}

module.exports = {
    buildMakePerson
}