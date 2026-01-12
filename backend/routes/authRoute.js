const express = require("express");
const { userSignUp, userLogin } = require("../controllers/authContoller");
const isLoggedIn = require("../middlewares/isLoggedIn");

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);

router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Logout successful" });
});

router.get("/check", isLoggedIn, (req, res) => {
  res.status(200).json({ ok: true, user: req.user });
});

router.get("/", (req, res) => {
  res.send("Auth Route Working");
});

module.exports = router;
