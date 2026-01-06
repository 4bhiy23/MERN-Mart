const express = require('express')
const router = express.Router()
const productModel = require('../models/productModel')
const orderModel = require('../models/orderModel')

// Orders
router.get("/orders" , async (req , res) => {
    const orders = await orderModel.find()
    res.send(orders)
})

// Products
router.get("/products" , async (req , res) => {
    try{
        const products = await productModel.find()
        res.json(products)
    } catch (error){
        return res.json("error: ", error)
    }
})

router.delete("/product/delete/:productid" , async (req , res) => {
    try{
        await productModel.findOneAndDelete({_id: req.params.productid})
        res.json({message: `Product deleted ${req.params.productid}`})
    } catch (error){
        console.log("Error deleting",error)
    }
})

router.post("/product/edit/:productid" , async (req , res) => {
    const { title, description, price, category, image, stock } = req.body
    await productModel.findOneAndUpdate({_id: req.params.productid}, { title, description, price, category, image, stock } )
    
    res.json({ title, description, price, category, image, stock, message: "Product details updated"})
})

module.exports = router