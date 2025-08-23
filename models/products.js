const mysql = require("mysql2");
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

module.exports = {
    showAllData,
    showAllCategories
    // showOneData
}