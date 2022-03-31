require("dotenv").config()
const express = require("express")
const app = express()
const userRouter = require("./src/routes/userLogin")
const port = 4000 || process.env.PORT
require("./src/db")

app.use(express.json())
app.use("/user",userRouter)



app.listen(port)