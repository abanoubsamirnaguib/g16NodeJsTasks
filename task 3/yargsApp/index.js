//my custom modules
const user = require("./controllers/user")
const bank = require("./controllers/bank")
const yargs = require("yargs")

yargs.command({ 
    command:"addUser",
    describe:"used for adding users",
    builder:{
        name:{
            type:String,
            required:true
        },
        intialBalance:{
            type:Number,
            required:true
        },
    },
    handler:function(argv){
        let userData = {
            name:argv.name,
            intialBalance:argv.intialBalance,          
        }
        user.addUser(userData)
    }
})
yargs.command({
    command:"showAll",
    describe:"used for show all users",
    handler:function(){
        user.showAll()
    }
})
yargs.command({
    command:"showUser",
    describe:"used for show single users",
    builder:{
        userID:{
            type:Number,
            required:true
        }
    },
    handler:function(argv){
        user.showSingle(argv.userID)
    }
})
yargs.command({
    command:"delUser",
    describe:"used for delete users",
    builder:{
        userID:{
            type:Number,
            required:true
        }
    },
    handler:function(argv){
        user.delUser(argv.userID)
    }
})
yargs.command({
    command:"editUser",
    describe:"used for edit users",
    builder:{
        userID:{
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        }
    },
    handler:function(argv){
        user.editUser(argv.userID , argv.name)
    }
})
yargs.command({
    command:"opt",
    describe:"operation on user Account",
    builder:{
        userId:{
            type:Number,
            required:true
        },
        opValue:{
            type:Number,
            required:true
        },
        opType:{
            type:String,
            required:true
        },
    },
    handler:function(argv){
        bank.opt(argv.userId , argv.opValue , argv.opType  )
    }
})
yargs.argv