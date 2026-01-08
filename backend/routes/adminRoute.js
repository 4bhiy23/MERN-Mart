const express = require('express')
const router = express.Router()
const productModel = require('../models/productModel')
const orderModel = require('../models/orderModel')
const upload = require('../config/multerConfig')

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

router.post("/product/edit/:productid", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;

    const updatedFields = { title: title, description: description, price: price, category: category, stock: stock };

    // Only update image if a new one is uploaded
    if (req.file) {
      updatedFields.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: req.params.productid },
      updatedFields,
      { new: true }
    );

    res.json({ product: updatedProduct, message: "Product details updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


// router.post("/product/edit/:productid", upload.single("image") , async (req , res) => {
//     const { title, description, price, category, stock } = req.body
//     await productModel.findOneAndUpdate({_id: req.params.productid}, { title, description, price, category, stock, image: {data: req.file.buffer, contentType: req.file.mimetype,} } )
    
//     res.json({ title, description, price, category, image, stock, message: "Product details updated"})
// })

module.exports = router