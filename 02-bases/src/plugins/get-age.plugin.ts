import { getAge as getAgePlugin } from ".";



export const getAge: (birthdate: string) => (number | Error) = (birthdate: string) =>  getAgePlugin(birthdate);
