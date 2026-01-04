const express = require("express")
const app = express()
const db = require('./config/db')
require("dotenv").config()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const indexRouter = require("./routes/indexRoute")
const productRouter = require("./routes/productRoute")
const orderRouter = require("./routes/orderRoute")
const authRouter = require("./routes/authRoute")
const cartRouter = require("./routes/cartRoute")
const isLoggedIn = require("./middlewares/isLoggedIn")

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/auth", authRouter)
app.use("/product", isLoggedIn, productRouter)
app.use("/orders", isLoggedIn, orderRouter)
app.use("/cart", isLoggedIn, cartRouter)
app.use("/", indexRouter)

app.listen(3000)