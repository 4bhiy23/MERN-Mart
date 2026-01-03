const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()

router.get("/" , (req , res) => {
    res.send("order Route Working")
})

module.exports = router