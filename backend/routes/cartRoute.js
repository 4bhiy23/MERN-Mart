const express = require('express')
const router = express.Router()
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const isLoggedIn = require('../middlewares/isLoggedIn')

// Remove item from cart option
// Change quantity of items

router.patch("/clear", async (req, res) => {
//   const userId = req.user._id
  await userModel.updateOne({ email: req.user.email }, { $set: { cart: [] } })
  res.json({ message: "Cart cleared successfully" })
});

router.delete("/deletefromcart/:productid", async (req , res) => {
    const productObjectId = new mongoose.Types.ObjectId(req.params.productid);
    const user = await userModel
    .updateOne({email: req.user.email},{
        $pull:{ cart: {product: productObjectId}}
    })
    res.json({message: "Product deleted from cart"})
})

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