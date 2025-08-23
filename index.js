const express = require("express")
const app = express()
require("dotenv").config()

app.set("view engine", "ejs");

const webRouters = require("./routes/web")
app.use(webRouters)


const port = process.env.port
app.listen(port, () => {
    console.log("server open successfuly ✅")
})