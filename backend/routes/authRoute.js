const express = require('express')
const { userSignUp, userLogin } = require('../controllers/authContoller')
const router = express.Router()
const isLoggedIn = require("../middlewares/isLoggedIn");


router.post("/signup", userSignUp)
router.post("/login", userLogin)

router.get("/logout", (req , res) => {
    res.clearCookie("token")
    res.json({message: "Logout successfull"})
})

router.get("/check", isLoggedIn, (req, res) => {
  res.status(200).json({ ok: true, user: req.user });
});


router.get("/", (req , res) => {
    res.send("Auth Route Working")
})

module.exports = router