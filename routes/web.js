const express = require("express")
const route = express.Router()
const controllerNorthwind = require("../conrollers/controllerNorthwind")

route.get("/", (req, res) => {
    controllerNorthwind.home(req, res);
})

route.get("/cats", (req, res) => {
    controllerNorthwind.cats(req, res);
})
module.exports = route