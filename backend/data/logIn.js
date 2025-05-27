import bcrypt from 'bcrypt'

const login =  [
    {
        email: "erdene.ochir@example.com",
        password: bcrypt.hashSync("123", 10),
        role_name: "admin",
        web: true
    }
]

export default login
