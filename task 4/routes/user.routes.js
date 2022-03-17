const router = require("express").Router();
const userController = require('../app/controllers/user.controller');
const BankController = require('../app/controllers/bank.controller');

router.get("/", userController.index)
router.get("/show/:id", userController.show)
router.get("/add", userController.addUser)
router.post("/add", userController.addUserLogic)
router.get("/edit/:id", userController.editUser)
router.post("/edit/:id", userController.editUserLogic)
router.get("/delete/:id", userController.deleteUser)

router.get("/addOperation/:id", BankController.opt)
router.post("/addOperation/:id", BankController.optLogic)




module.exports = router;
