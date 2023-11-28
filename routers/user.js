const express = require("express")
const router = express.Router()
const multer = require("multer")
const { checkSchema } = require("express-validator");
const userController = require("../controllers/user")
const userRegister = require("../validations/userRegister")

const doubleMiddleware = [multer().none(), checkSchema(userRegister)]
router.post("/register", doubleMiddleware, userController.register)



module.exports = router