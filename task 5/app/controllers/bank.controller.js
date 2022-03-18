const db = require("../../models/connectiondb")
const { ObjectId } = require("mongodb")

// const users = dealWithJson.readData()

const add = (userId, val) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: userId });
        user.opt.push({
            val: val,
            type: "add",
            time: new Date().toLocaleString(),
            remainigBalance: user.remainigBalance + val
        })
        await connection.collection("user").updateOne({ _id: userId }, {
            $set:{
                remainigBalance: user.remainigBalance + val ,
                opt:user.opt
            }
        })
    })
}

const withdraw = (userId, val) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: userId });
            user.opt.push({
            val: val,
            type: "withdraw",
            time: new Date().toLocaleString(),
            remainigBalance: user.remainigBalance - val
        })
        await connection.collection("user").updateOne({ _id: userId }, {
            $set:{
                remainigBalance: user.remainigBalance - val ,
                opt:user.opt
            }
        })
    })
}

const opt = (req, res) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: new ObjectId(req.params.id) });
        res.render("operation", {
            name: user.name
        })
    })
}

const optLogic = (req, res) => {
    db(async (err, connection) => {
        if (err) res.send(err)
        const user = await connection.collection("user").findOne({ _id: new ObjectId(req.params.id) });
        if (!user) {
            console.log(("not user found"));
            return res.render("operation", {
                name: user.name,
                error: "User Not Found"
            })
        }
        if (req.body.opType != "withdraw" && req.body.opType != "add") {
            console.log(("undefined process"));
            return res.render("operation", {
                name: user.name,
                error: "undefined process"
            })
        }
        if (req.body.opType == "add") {
            if (req.body.opValue > 6000) {
                console.log(("can't add more than 6000 "));
                return res.render("operation", {
                    name: user.name,
                    error: "can't add more than 6000"
                })
            }
           add(new ObjectId(req.params.id), +req.body.opValue);
        }
        if (req.body.opType == "withdraw") {
            if (req.body.opValue >= user.remainigBalance) {
                console.log(("your remainig Balance don't get enough money"));
                return res.render("operation", {
                    name: user.name,
                    error: "your remainig Balance don't get enough money"
                })
            }
            withdraw(new ObjectId(req.params.id), +req.body.opValue);
        }


        // const updateUser = {
        //     $set: {...user}
        // }
        // const userData = await connection.collection("user").updateOne({ _id: new ObjectId(req.params.id) }, updateUser)

        // console.log(userData);
        res.redirect("/")
    })
}

module.exports = { opt, optLogic }