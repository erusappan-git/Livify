import bcrypt from "bcrypt";

const users = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("12345", 10),
        isAdmin: true
    },
    {
        name: "User 1",
        email: "user1@gmail.com",
        password: bcrypt.hashSync("12345", 10),
        isAdmin: false
    }
]

export default users;