const express = require('express')
const router = express.Router()
const productModel = require('../models/productModel')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post("/" , async (req , res) => {
    const { title, description, price, category, image, stock } = req.body
    const product = await productModel.create({
        title, description, price, category, image, stock
    })
    // res.json({
    //     success: true,
    //     message: "Product was created ^_^"
    // })
    res.redirect("/admin")
})

router.get("/", async (req , res) => {
    try {
        const products = await productModel.find()
        res.send(products)
    } catch (error) {
        res.json({error})
    }
    // res.send("Product Route Working")
})

module.exports = router