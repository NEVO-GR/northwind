const express = require("express")
const route = express.Router()
const controllerNorthwind = require("../conrollers/controllerNorthwind")

route.get("/", (req, res) => {
    controllerNorthwind.home(req, res);
})

route.get("/products", (req, res) => {
    controllerNorthwind.products(req, res);
})

route.get("/products/create", controllerNorthwind.showCreateProduct)

route.get("/products/update/:id", controllerNorthwind.showUpdateProduct)

// route.post("/products/update/new/:id");
// route.

module.exports = route