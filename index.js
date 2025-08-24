const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

require("dotenv").config()
app.set("view engine", "ejs");

const webRouters = require("./routes/web")
app.use(webRouters)


const port = process.env.port
app.listen(port, () => {
    console.log("server open successfuly ✅")
})