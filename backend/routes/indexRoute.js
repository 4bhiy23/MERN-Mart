const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const userModel = require('../models/userModel')
const router = express.Router()

router.get("/" , (req , res) => {
    res.send("/ Route Working")
})

router.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const currentUser = await userModel
      .findById(req.user.id)
      .select("username email");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(currentUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/update-profile", async (req , res) => {

})

module.exports = router