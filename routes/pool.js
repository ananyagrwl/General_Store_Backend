var mysql = require("mysql")
var pool= mysql.createPool({
    host:"localhost",
    port:3306,
    user:"root",
    database:"general_store",
    password:"ananya123",
    multipleStatements:true,
    connectionLimit:100
})

module.exports=pool