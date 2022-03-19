const express = require("express")
const app = express()

const path = require("path")
const hbs = require("hbs")
const userRoute = require('../routes/user.routes');

const viewsDir = path.join(__dirname,"../resourses","views")
const layoutDir = path.join(__dirname,"../resourses","layouts")
const staticDir = path.join(__dirname,"../public","assets")


hbs.registerPartials(layoutDir)
app.set("view engine", "hbs")
app.set("views", viewsDir)
app.use(express.static(staticDir))

app.use(express.urlencoded({extended:true}))

app.use(userRoute);
app.get("*", (req,res)=>{
    res.render("err404", {
        pageTitle:"Not found"
    } )
})


module.exports = app