/**
 * @file
 * 
 * Data access layer that shows all departments.
 * 
 */

const cTable = require("console.table");
const fs = require("fs");
const Db = require("./Db")

module.exports = class DalViewAllDepartments {
        constructor() {}
        read(callback) {
                const db = new Db();
                const conn = db.getConnection();
                conn.connect(err => {
                    if (err) throw err;

                    const fsErrorHandler = err => { if (err) throw err; }
                    const sqlViewAllDepartments = fs.readFileSync("./dal/queries/viewAllDepartments.sql", "utf8", fsErrorHandler);

                    const mysqlSelectAllErrorHandler = (err, res) => {
                        if (err) throw err;
                        const strTable = cTable.getTable(res);
                        console.log(strTable);
                        conn.end();

                        if (callback) callback();
                    }
                    conn.query(sqlViewAllDepartments, mysqlSelectAllErrorHandler);
                });
            } // read
    } // DalViewAllDepartments