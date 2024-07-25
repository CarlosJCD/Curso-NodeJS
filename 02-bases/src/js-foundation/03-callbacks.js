const users = [
    {
        id: 1,
        name: "John Doe"
    },
    {
        id: 2,
        name: "Jane Doe"
    }
]

/**
 * 
 * @param {number} id 
 * @param { (error: string, user: { id:number, name: string }) => void } callback
 * @returns 
 */
function getUserById(id, callback) {
    const user = users.find((user) => user.id === id);

    user ? callback(null, user) : callback(`USUARIO no encontrado con id ${id}`);
}

module.exports = {
    getUserById
}