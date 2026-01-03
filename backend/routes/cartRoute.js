const express = require('express')
const router = express.Router()
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')

// Remove item from cart option
// Change quantity of items

router.get("/addtocart/:productid", async (req , res) => {
    const user = await userModel.findOne({ email: req.user.email })

    const existingProduct = user.cart.find((e) => e.product.toString() === req.params.productid)
    if (existingProduct) {
        existingProduct.quantity += 1
    } else {
        user.cart.push({
            product: req.params.productid,
            quantity: 1,
        });
    }
    
    await user.save()
    // res.redirect("/")
    res.json({
        success: true,
        message: "Product added to cart with default quantity of 1"
    })
})

router.get("/", async (req , res) => {
    const user = await userModel.findOne({email: req.user.email}).populate("cart.product")
    res.send(user.cart)
})

module.exports = router