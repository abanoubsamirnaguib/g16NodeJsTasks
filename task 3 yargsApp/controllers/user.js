//npm installed modules
const chalk = require("chalk")
const dealWithJson = require("./dealWithJson")
const users = dealWithJson.readData()

const findMyUserIndex = (users, key, val)=>{
    let i = users.findIndex( user => user[key] == val )
    return i
}
const addUser = (userData) =>{
    try{
        if(userData.name.length<3) throw new Error("invalid name")
        const users = dealWithJson.readData()
        userData = { accNum : Date.now() , ...userData  , remainigBalance : userData.intialBalance , opt: [] }
        users.push(userData)
        dealWithJson.writeData(users)
        console.log(chalk.green("user Added"))    
    }
    catch(e){
        console.log(chalk.red(e.message))
    }
}
const showAll = () => {
    try{
        const users = dealWithJson.readData()
        if(users.length==0) throw new Error("no users yet")
        else{
            users.forEach(user=>{
                console.log(chalk.green(`
            id: ${user.accNum} - name: ${user.name} - intialBalance: ${user.intialBalance} - remainigBalance: ${user.remainigBalance}
            `))
            })
        }
    }
    catch(e){
        console.log(chalk.red(e.message))
    }
}
const showSingle = (userId) => {
    const users = dealWithJson.readData()
    const user = findMyUserIndex(users, "accNum", userId)  
    if(user!=-1) console.log(users[user])
    else console.log('not found')
}
const delUser = (userId) => {
    let users = dealWithJson.readData()
    let filtered = users.filter(u=> u.accNum != userId)
    if(users.length == filtered.length) return console.log("not found")
    dealWithJson.writeData(filtered)
}
const editUser = (userId, name) => {
    const users = dealWithJson.readData()
    const i = users.findIndex(u=> u.accNum==userId)
    if(i==-1) return console.log("not found")
    // users[i] = {accNum:userId, ...newData}
    users[i].name = name;
    dealWithJson.writeData(users)
    console.log("data edited")
}
const getUser = (UserId)=>{
    let i = users.findIndex( user => user.accNum == UserId )
    return i
}
module.exports = { addUser, showAll, showSingle, delUser, editUser , getUser}