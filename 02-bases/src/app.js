const { getAge, getUUID } = require("./plugins")


// const { emailTemplate } = require("./js-foundation/01-template");
// require("./js-foundation/02-callbacks") ;
// const { getUserById } = require("./js-foundation/03-callback") ;
// const { getUserById } = require("./js-foundation/04-arrow") ;
// const { buildMakePerson } = require("./js-foundation/05-factory"); 
const getPokemonById = require("./js-foundation/06-promises"); 

getPokemonById(1).then( pokemonName => console.log({pokemonName}))
 


// ! Function factory usando patron adaptador e inyección de dependencias
// const makePerson = buildMakePerson({getUUID, getAge })

// const obj = { name: "John", birthdate: "2003-04-30" }; 

// const john = makePerson(obj);

// console.log({ john });