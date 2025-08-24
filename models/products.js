const mysql = require("mysql2");
const { suppliers } = require("../conrollers/controllerNorthwind");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

// async function testConnection() {
//     try{
//         await pool.getConnection()
//         console.log("database connect successfuly");
//     }catch(err) {
//         console.log({"status": "err", "err": err})
//     }
// }
// testConnection();

// async function showAllData() {
//     try {
//         const [data] = await pool.query("SELECT * FROM products", [])
//         return {status: "success", data: data}
//     } catch (e) {
//         return {status: "error", error: e}
//     }
// }

// async function showOneData() {
//     try {
//         const id = res.param.id;
//         const [data] = await pool.query("SELECT * FROM products WHERE id = ?", [id])
//         return {status: "success", data: data}
//     } catch (e) {
//         return {status: "error", error: e}
//     }
// }

function showAllData() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM products", [], (err, data) => {
            if (!err) {
                resolve(data);
            }else {
                throw err;
            }
        })
    })
}

function showAllCategories() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM categories", [], (err, result) => {
            if(!err) {
                resolve(result);
            }else {
                reject(err);
            }
        })
        
    })
}

function showAllSuppliers() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM suppliers", [], (err, result) => {
            if(!err) {
                resolve(result);
            }else {
                reject(err);
            }
        })
        
    })
}
function showAllProducts() {
    return new Promise((resolve, reject) => {
        const q = `SELECT p.ProductID, p.ProductName, s.CompanyName, c.CategoryName,p.QuantityPerUnit, p.UnitPrice, p.UnitsInStock, p.UnitsOnOrder, p.ReorderLevel, p.Discontinued 
                    FROM products AS p, suppliers AS s, categories AS c
                    WHERE p.CategoryID = c.CategoryID AND p.SupplierID = s.SupplierID;`;
        pool.query(q, [], (err, result) => {
            if(!err) {
                resolve(result);
            }else {
                reject(err);
            }
        })
        
    })
}
function showOneProduct(id) {
    return new Promise((resolve, reject) => {
        const q = "SELECT * FROM products WHERE ProductID = ?";
        pool.query(q, [id], (err, result) => {
            if (!err) {
                resolve(result)
            }else {
                reject(err)
            }
        })
    })
}

// function createProduct() {
//     const suppliers = showAllSuppliers().then((resolve) => {
//         return resolve()
//     })
//     const categories = showAllCategories().then((resolve) => {
//         return resolve()
//     })

//     return new Promise((resolve, reject) => {
//         resolve({suppliers, categories})
//     })
// }

module.exports = {
    showAllData,
    showAllCategories,
    showAllSuppliers,
    showAllProducts,
    showOneProduct
    // showOneData
}