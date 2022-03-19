const db = require("../../models/connectiondb")
const { ObjectId } = require("mongodb")

const index = (req, res) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const users = await connection.collection("user").find().toArray()
        res.render("home", {
            pageTitle: "home",
            users,
            isEmpty: (users.length == 0) ? true : false
        })
    })
}

const show = (req, res) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: new ObjectId(req.params.id) });

        res.render("show", {
            pageTitle: "show",
            user,
            isEmpty: user ? false : true
        })
    })
}

const addUser = (req, res) => {
    res.render("add", {
        pageTitle: "addd",
    })
}

const addUserLogic = (req, res) => {
    let user = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        intialBalance: +req.body.intialBalance,
        remainigBalance: +req.body.intialBalance,
        opt: []
    }
    
    db(async (err, connection) => {
        if (err) res.send(err)
        const userData = await connection.collection("user").insertOne({ ...user })
        // console.log(userData);
        res.redirect("/")
    })
}
const editUser = (req, res) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: new ObjectId(req.params.id) });
        res.render("edit", {
            pageTitle: "edit",
            user
        })
    })

}
const editUserLogic = (req, res) => {

    const updateUser = {
        $set: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    }
    db(async (err, connection) => {
        if (err) res.send(err)
        const userData = await connection.collection("user").updateOne({ _id: new ObjectId(req.params.id) }, updateUser)
        // console.log(userData);
        res.redirect("/")
    })
}

const deleteUser = (req, res) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const userData = await connection.collection("user").deleteOne({ _id: new ObjectId(req.params.id) })
        // console.log(userData);
        res.redirect("/")
    })
}

module.exports = { index, show, addUser, addUserLogic, editUser, editUserLogic, deleteUser }