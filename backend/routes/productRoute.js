const express = require('express')
const router = express.Router()
const productModel = require('../models/productModel')
const isLoggedIn = require('../middlewares/isLoggedIn')
const upload = require('../config/multerConfig')

router.post("/" , upload.single("image") , async (req , res) => {
    const { title, description, price, category, stock } = req.body
    const product = await productModel.create({
        title, description, price, category, stock, image: {data: req.file.buffer, contentType: req.file.mimetype,}
    })
    return res.json({
        success: true,
        message: "Product was created ^_^"
    })
    // res.redirect("/admin")
})

// Images end point
router.get("/image/:productid" , async (req , res) => {
  try {
    const product = await productModel
      .findById(req.params.productid)
      .select("image");

    if (!product || !product.image?.data) {
      return res.sendStatus(404);
    }

    res.set("Content-Type", product.image.contentType);
    res.send(product.image.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


router.get("/", async (req , res) => {
    try {
        const products = await productModel.find().select("-image")
        res.send(products)
    } catch (error) {
        res.json({error})
    }
    // res.send("Product Route Working")
})

module.exports = router