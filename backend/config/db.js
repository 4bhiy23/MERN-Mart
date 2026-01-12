const mongoose = require('mongoose')

mongoose
.connect("mongodb+srv://Admin:admin1234@cluster0.8vtujig.mongodb.net/")
.then(function(){
    console.log("Mongoose connected successfully")
})
.catch(error => {
    console.log("Mongoose connection error:", error)
})

module.exports = mongoose.connection