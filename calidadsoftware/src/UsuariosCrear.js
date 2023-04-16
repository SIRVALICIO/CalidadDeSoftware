const mongoose = require("mongoose")


const LogInSchema = new mongoose.Schema(
    {
        cedula: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true
        }

    }, {
        versionKey: false // You should be aware of the outcome after set to false
    }
)

const collection = new mongoose.model("seguridad", LogInSchema)
collection.insertMany([
    {
        cedula: "12345678",
        password: "micontrasena1",

    },
    {
        cedula: "98765432",
        password: "micontrasena2",

    }
])

module.exports = collection



