const mongoose = require("mongoose")


const LogInAduit = new mongoose.Schema(
    {

        cedula:{
          type: Number,
          required: true
        },
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: new Date()
        },
        accion:{
            type:String,
            required: true
        }



    },

    {versionKey: false}
)
const collectionAudtit = new mongoose.model("UsuariosIngresados", LogInAduit)
module.exports = collectionAudtit