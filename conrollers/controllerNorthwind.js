const moduleNorthwind = require("../models/products");

function home(req, res) {
    // res.send("welcome to our home...")
    moduleNorthwind.showAllData()
    .then((resolve) => {
        res.render("pages/index", { products: resolve });
    }).catch((e) => {
        res.send("error" + e)
    })
}

function cats(req, res) {
    moduleNorthwind.showAllCategories()
    .then((resolve) => {
        // res.send(resolve)
        const cats = [] 
        for(e of resolve) {
            cats.push({id: e.CategoryID, name: e.CategoryName})
        }
        res.send(cats)
    })
    .catch((reject) => {
        console.log(reject)
        res.send(reject)
    })
}

module.exports = {
    home,
    cats
}