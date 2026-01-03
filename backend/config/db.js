const mongoose = require('mongoose')

mongoose
.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(function(){
    console.log("Mongoose connected successfully")
})
.catch(error => {
    console.log("Mongoose connection error:", error)
})

module.exports = mongoose.connection