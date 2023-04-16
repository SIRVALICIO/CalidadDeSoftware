const axios= require("axios")

const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const templatePath = path.join(__dirname, '../templates')
const collection = require("./UsuariosCrear")
const collectionAudtit = require("./UsuariosAudit")
const mongoose = require("mongoose")
const Handlebars = require('handlebars')
const {render} = require("express/lib/application");
const {home} = require("nodemon/lib/utils");


mongoose.connect("mongodb://127.0.0.1:27017/SistemaDB")
    .then(() => {
        console.log("MongoConnected")
    }).catch(() => {
    console.log("Error al conectar")
})


app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended: false}))




app.get("/", (req, res) => {
    res.render("login.hbs")
})

app.get("/signup", (req, res) => {
    res.render("signup.hbs")
})

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }
    await collection.insertMany([data])

    res.render("login")


})

app.post("/ingresar", async (req, res) => {

    console.log(req.body.Ingresar)
    const data = {
        cedula: req.body.cedula,
        name: req.body.nombreYapellido,
        accion: req.body.Ingresar

    }



    await collectionAudtit.insertMany([data])

    try {
        const datos = await collectionAudtit.find();
        console.log(datos)

        // Llamar a una función para cargar los datos en la tabla utilizando Handlebars
        res.render('home',{
            datos:datos
        })

    } catch (err) {
        console.error('Error al obtener los datos:', err);
        res.status(500).json({error: 'Error al obtener los datos'});
    }

})


app.post("/login", async (req, res) => {
    try {


        const check = await collection.findOne({cedula: req.body.name})


        if (check.password === req.body.password) {
            console.log(check)


            res.render("home")




        } else {
            res.send("wrong password")
        }
    } catch (error) {
        console.log(error)
        res.send("wrong details")
    }

})




app.listen(3000, () => {

    console.log("port connected")

})

