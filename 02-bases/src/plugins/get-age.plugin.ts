// const getAgePlugin = require('get-age')


export const getAge: (birthdate: string) => (number) = (birthdate: string) =>  new Date().getFullYear() - new Date(birthdate).getFullYear();;
