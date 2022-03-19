const {MongoClient} = require("mongodb")
const dbUrl = "mongodb://127.0.0.1:27017"
const dbName = "bankData"

const myConnection = (cb)=>{
    MongoClient.connect(dbUrl,{},(err,Client)=>{
        if(err) return cb(err,false)
        const Connection = Client.db(dbName)
        cb(false,Connection)
    })
}  


module.exports = myConnection