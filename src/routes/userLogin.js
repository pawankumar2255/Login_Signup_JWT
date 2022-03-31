const express = require("express")
const { verifyToken } = require("../../auth/auth")
const router = express.Router()
const {signup,login, showProfile}= require("../../controllers/authcontroller")


router.post("/signup",signup)
router.post("/login",login)
router.get("/profile",verifyToken,showProfile)

module.exports = router