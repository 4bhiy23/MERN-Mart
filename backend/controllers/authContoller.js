const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.userSignUp = async (req, res) => {
  try {
    const { username, password, email } = req.body
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.json({
        message: "User already Exists!"
      })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
      username,
      email,
      password: hash
    })

    const token = jwt.sign({ id: user._id, email, username: user.username  }, process.env.JWT_SECRET)
    res.cookie("token", token)
    // res.redirect("/")

    res.json({ user })

  } catch (error) {
    res.json({ message: error.message })
  }
}

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

