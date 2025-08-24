const moduleNorthwind = require("../models/products");

function home(req, res) {
    res.redirect("/products")
}

// function cats(req, res) {
//     moduleNorthwind.showAllCategories()
//     .then((resolve) => {
//         // res.send(resolve)
//         const cats = [] 
//         for(e of resolve) {
//             cats.push({id: e.CategoryID, name: e.CategoryName})
//         }
//         res.send(cats)
//     })
//     .catch((reject) => {
//         console.log(reject)
//         res.send(reject)
//     })
// }


// function suppliers(req, res) {
//     moduleNorthwind.showAllSuppliers()
//     .then((resolve) => {
//         // res.send(resolve)
//         const cats = [] 
//         for(e of resolve) {
//             cats.push({id: e.SupplierID, name: e.CompanyName, city: e.City})
//         }
//         res.send(cats)
//     })
//     .catch((reject) => {
//         console.log(reject)
//         res.send(reject)
//     })
// }


function products(req, res) {
    moduleNorthwind.showAllProducts()
    .then((resolve) => {
        // res.send(resolve)
        res.render("pages/index", {products: resolve})
    })
    .catch((reject) => {
        console.log(reject)
        res.send(reject)
    })
}

function showCreateProduct(req, res) {
    Promise.all([
        moduleNorthwind.showAllSuppliers(),
        moduleNorthwind.showAllCategories()
    ])
    .then(([suppliers, categories]) => {
        res.render("pages/create", {suppliers, categories})
    })
    .catch((err) => {
        res.status(500).send("err: " + err)
    })
}

function showUpdateProduct(req, res) {
    const id = req.params.id;
    Promise.all([
        moduleNorthwind.showAllSuppliers(),
        moduleNorthwind.showAllCategories(),
        moduleNorthwind.showOneProduct(id)
    ])
    .then(([suppliers, categories, product]) => {
        res.render("pages/update", {suppliers, categories, product: product[0]})
        // res.send(product)
    })
    .catch((err) => {
        res.status(500).send("err: " + err)
    })
}

function deleteProduct(req, res) {
    const id = req.params.id;
    moduleNorthwind.deleteProduct(id)
    .then((data) => {
        // res.send(data)
        if(data.affectedRows == 1) {
            res.redirect("/products?msg=ds")
        }else {
            res.redirect("/products?msg=df")
        }
    })
    .catch((err) => {
        res.send(err)
    })
}

function createProduct(req, res) {
    moduleNorthwind.createProduct(req.body)
    .then((data) => {
        // res.send(data)
        if(data.affectedRows == 1) {
            res.redirect("/products?msg=cs")
        }else {
            res.redirect("/products?msg=cf")
        }
    })
    .catch((err) => {
        res.send("err" + err)
    })
    // res.send(req.body)
}

function updateProduct(req, res) {
    moduleNorthwind.updateProduct(req.params.id, req.body)
    .then((data) => {
        // res.send(data);
        if(data.affectedRows == 1) {
            res.redirect("/products?msg=us");
        }else {
            res.redirect("/products?msg=uf");
        }
    })
    .catch((err) => {
        res.send(data);
    })
}

module.exports = {
    home,
    // cats,
    // suppliers,
    products,
    showCreateProduct,
    showUpdateProduct,
    deleteProduct,
    createProduct,
    updateProduct
}