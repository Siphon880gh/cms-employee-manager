/**
 * @file
 * 
 * Data access layer that shows all employees sorted by ID, department, or manager.
 * 
 */

const cTable = require("console.table");
const fs = require("fs");
const Db = require("./Db")

module.exports = class DalViewAllEmployeesBy {
        constructor(context) {
            if (!context) context = {};
            const { orderBy } = context;
            this.orderBy = orderBy; // undefined vs "DEPT" vs "MANAGER"
            // console.log("DalViewAllEmployeesBy constructor orderBy val", this.orderBy);
            // process.exit(0);
        }
        read(callback) {
                const db = new Db();
                const conn = db.getConnection();
                conn.connect(err => {
                    if (err) throw err;

                    // console.log("DalViewAllEmployeesBy read orderBy val", this.orderBy);
                    // process.exit(0);

                    // console.log("GLOBAL DB CONNECT");

                    const fsErrorHandler = err => { if (err) throw err; }
                    let sqlViewAllEmployeesBy = "";

                    switch (this.orderBy) {
                        case "DEPT":
                            sqlViewAllEmployeesBy = fs.readFileSync("./dal/queries/viewAllEmployeesByDept.sql", "utf8", fsErrorHandler);
                            break;
                        case "MANAGER":
                            sqlViewAllEmployeesBy = fs.readFileSync("./dal/queries/viewAllEmployeesByManager.sql", "utf8", fsErrorHandler);
                            break;
                        default:
                            sqlViewAllEmployeesBy = fs.readFileSync("./dal/queries/viewAllEmployees.sql", "utf8", fsErrorHandler);
                    }

                    const mysqlSelectAllErrorHandler = (err, res) => {
                        if (err) throw err;
                        // console.log("GLOBAL DB CONNECT -> VIEW ALL EMPLOYEES TYPE AND VAL", res);
                        // console.log("res array method forEach and map ptr?", res.forEach, res.map);
                        const strTable = cTable.getTable(res);
                        // console.log("Table string val\n", strTable);
                        console.log(strTable);
                        conn.end();

                        if (callback) callback();
                    }
                    conn.query(sqlViewAllEmployeesBy, mysqlSelectAllErrorHandler);
                });
            } // read
    } // DalViewAllEmployeesBy