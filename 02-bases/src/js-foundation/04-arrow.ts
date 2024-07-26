import { User, users } from "./03-callbacks";

export const getUserById = (id: number, callback: (error?: string, user?: User) => void ) => {
    const user = users.find((user) => user.id === id);

    user ? callback(undefined, user) : callback(`USUARIO no encontrado con id ${id}`);
}
