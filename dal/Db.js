const mysql = require('mysql2');
const fs = require('fs');
const process = require("process");

/** 
 * On computers with MAMP Mysql, their port will override any Mysql installations port 
 * Add the MAMP MySQL Port to config/.env if it exists on your local machine
 */
if (fs.existsSync("./config/.env")) {
    require("dotenv").config({ path: "./config/.env" });
}

module.exports = class Db {
    constructor() {
        this.conn = mysql.createConnection({
            host: 'localhost',
            port: process.env.MAMP_MYSQL_PORT || 3306,
            // Your MySQL username
            user: 'root',
            // Your MySQL password
            password: 'root',
            database: 'employee_manager'
        });
    }
    getConnection() {
        return this.conn;
    }
}