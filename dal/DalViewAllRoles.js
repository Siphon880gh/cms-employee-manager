/**
 * @file
 * 
 * Data access layer that shows all roles joining with department table so that department fields 
 * have names instead of Id's.
 * 
 */

const cTable = require("console.table");
const fs = require("fs");
const Db = require("./Db")

module.exports = class DalViewAllRoles {
        constructor() {}
        read(callback) {
                const db = new Db();
                const conn = db.getConnection();
                conn.connect(err => {
                    if (err) throw err;

                    const fsErrorHandler = err => { if (err) throw err; }
                    const sqlViewAllRoles = fs.readFileSync("./dal/queries/viewAllRoles.sql", "utf8", fsErrorHandler);

                    const mysqlJoinErrorHandler = (err, res) => {
                        if (err) throw err;
                        const strTable = cTable.getTable(res);
                        console.log(strTable);
                        conn.end();

                        if (callback) callback();
                    }
                    conn.query(sqlViewAllRoles, mysqlJoinErrorHandler);
                });
            } // read
    } // DalViewAllRoles