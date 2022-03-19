const express = require("express")
const app = express()

const path = require("path")
const hbs = require("hbs")
const userRoute = require('../routes/user.routes');

const viewsDir = path.join(__dirname,"../resourses","views")
const layoutDir = path.join(__dirname,"../resourses","layouts")
const staticDir = path.join(__dirname,"../public","assets")
 
app.use(express.json())


hbs.registerPartials(layoutDir)
app.set("view engine", "hbs")
app.set("views", viewsDir)
app.use(express.static(staticDir))

app.use(express.urlencoded({extended:true}))
// app.use(express.json())

app.use(userRoute); 


module.exports = app