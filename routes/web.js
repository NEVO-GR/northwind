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

route.post("/products/create/new", controllerNorthwind.createProduct);

route.get("/products/update/:id", controllerNorthwind.showUpdateProduct)

route.post("/products/update/one/:id", controllerNorthwind.updateProduct)

route.get("/products/delete/:id", controllerNorthwind.deleteProduct)

module.exports = route