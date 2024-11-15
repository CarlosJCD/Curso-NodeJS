export interface User {
    id: number, 
    name: string
}

export const users: User[] = [
    {
        id: 1,
        name: "John Doe"
    },
    {
        id: 2,
        name: "Jane Doe"
    }
]

export const getUserById = (id: number, callback: (error?: string, user?: User) => void ) => {
    const user = users.find((user) => user.id === id);

    user ? callback(undefined, user) : callback(`USUARIO no encontrado con id ${id}`);
}