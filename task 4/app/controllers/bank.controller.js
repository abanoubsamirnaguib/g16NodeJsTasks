const dealWithJson = require("../helper/dealWithJson")
const users = dealWithJson.readData()

const getUser = (UserId)=>{
    let i = users.findIndex( user => user.id == UserId )
    return i
}

const add = (userId, val) => {

    let i = getUser(userId);
    if (val < 6000) {      
        users[i].remainigBalance += val;
        console.log("Current balance \n" + users[i].remainigBalance);
    } else {
        console.log("can't add more than 6000 ");
    }
}
const withdraw = (userId, val) => {
    let i = getUser(userId);
    if (val <= users[i].remainigBalance) {
        users[i].remainigBalance -= val;
        console.log("Current balance \n" + users[i].remainigBalance);
    } else {
        console.log("your remainig Balance don't get enough money");
    }
}

const opt =(req, res)=>{
    let i = getUser(req.params.id);
    res.render("operation" , {
        name:users[i].name
    })
}

const optLogic =(req , res)=>{
        let i = getUser(req.params.id); 
        if (i == -1 ){
            // console.log(i);
             console.log(("not user found"));
             return res.send("Error No User")
        }
        if (req.body.opType != "withdraw" && req.body.opType != "add"){
             console.log(("undefined process"));
             return res.send("undefined process")
        }
        if (req.body.opType == "add") {
            if(req.body.opValue > 6000){
                console.log(("can't add more than 6000 "));
               return res.send("can't add more than 6000 ")
            }
            add(req.params.id , +req.body.opValue);
        }
        if (req.body.opType == "withdraw") {
            if (req.body.opValue >= users[i].remainigBalance){
                console.log(("your remainig Balance don't get enough money"));
                return  res.send("your remainig Balance don't get enough money")
            }
            withdraw(req.params.id, +req.body.opValue);
        }
        users[i].opt.push({
            val: +req.body.opValue ,
            type: req.body.opType ,
            time : new Date() ,
            remainigBalance : users[i].remainigBalance
        })
        dealWithJson.writeData(users);
        console.log(users[i].opt);
        res.redirect("/")

}

module.exports = {  opt ,  optLogic}