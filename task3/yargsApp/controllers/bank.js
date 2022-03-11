const userClass = require("./user")
const dealWithJson = require("./dealWithJson")
const chalk = require("chalk")
const users = dealWithJson.readData()

const add = (userId, val) => {
    let i = userClass.getUser(userId);
    if (val < 6000) {
        users[i].remainigBalance += val;
        console.log(chalk.green("Current balance \n" + users[i].remainigBalance));
    } else {
        console.log(chalk.magenta("can't add more than 6000 "));
    }
}
const withdraw = (userId, val) => {
    let i = userClass.getUser(userId);
    if (val <= users[i].remainigBalance) {
        users[i].remainigBalance -= val;
        console.log(chalk.green("Current balance \n" + users[i].remainigBalance));
    } else {
        console.log(chalk.red("your remainig Balance don't get enough money"));
    }
}
const opt = (userId , opValue, opType) => {
    let i = userClass.getUser(userId);
    if (i == -1 ){
        // console.log(i);
        return console.log(chalk.red("not user found"));
    }
    if (opType != "withdraw" && opType != "add"){
        return console.log(chalk.red("undefined process"));
    }
    if (opType == "add") {
        if(opValue > 6000){
            return console.log(chalk.magenta("can't add more than 6000 "));
        }
        add(userId, opValue);
    }
    if (opType == "withdraw") {
        if (opValue >= users[i].remainigBalance){
            return console.log(chalk.red("your remainig Balance don't get enough money"));
        }
        withdraw(userId, opValue);
    }
    users[i].opt.push({
        val: opValue ,
        type: opType ,
        time : new Date() ,
        remainigBalance : users[i].remainigBalance
    })
    dealWithJson.writeData(users);
    console.log(users[i].opt);
}
module.exports = { add, withdraw, opt }