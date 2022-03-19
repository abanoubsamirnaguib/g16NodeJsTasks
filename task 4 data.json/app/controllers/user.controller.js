const deal = require("../helper/dealwithjson.js")

const index = (req, res) => {
    let users =deal.readData();
    res.render("home" , {
        pageTitle:"home",
        users,
        isEmpty: (users.length == 0)? true :false
    })
}

const show = (req, res) => {
    const users = deal.readData();
    const userID = req.params.id;
    const user = users.find( u=> u.id == userID)
    res.render("show", {
        pageTitle:"show",
        user,
        isEmpty: user ? false : true
    })
}

const addUser =(req, res) => {
    res.render("add" , {
        pageTitle:"addd",
    })
}

const addUserLogic = (req, res) => {
    let user ={
        id: Date.now() ,
        name :req.body.name,
        age :req.body.age,
        email :req.body.email,
        intialBalance : +req.body.intialBalance,
        remainigBalance : +req.body.intialBalance,
        opt:[]
    }
    // res.send(user)
        let data = deal.readData();
        data.push(user);
        deal.writeData(data)
        res.redirect("/")
}
const editUser = (req, res) => {
    const users = deal.readData();
    const userID = req.params.id;
    const user = users.find( u=> u.id == userID);

    res.render("edit", {
        pageTitle:"edit",
        user
    } )
}
const editUserLogic = (req, res) => {
    const users = deal.readData();
    const userID = req.params.id;
    var i = users.findIndex( u=> u.id == userID);
            
        users[i] = {
           id: +userID,
           name :req.body.name,
           age :req.body.age,
           email :req.body.email,
           intialBalance : +users[i].intialBalance,
           remainigBalance : +users[i].remainigBalance,
           opt : users[i].opt
       }
        deal.writeData(users)
        res.redirect("/")
}

const deleteUser = (req, res) => {
    const users = deal.readData();
    const userID = req.params.id;
    const data = users.filter( u=> u.id != userID)
    deal.writedata(data)
    res.redirect("/");
}

module.exports = { index , show , addUser ,addUserLogic , editUser , editUserLogic , deleteUser  }