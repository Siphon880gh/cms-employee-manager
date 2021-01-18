/**
 * @file
 * 
 * Data access layer that shows all roles joining with department table so that department fields 
 * have names instead of Id's.
 * 
 */

const cTable = require("console.table");
const fs = require("fs");
const Db = require("./Db");

module.exports = class DalRemovedEmployee {
        constructor(deletableEmployeeId) {
            this.deletableEmployeeId = deletableEmployeeId;
        }
        deleteThenRead(callback) {
                // Insert new employee record
                const db = new Db();
                const conn = db.getConnection();
                conn.connect(err => {
                    if (err) throw err;

                    // console.log("DAL: Removed Employee deletableEmployeeId", this.deletableEmployeeId);
                    // throw "";

                    /** Delete from Employee table  */
                    conn.query("DELETE FROM employee WHERE id = ?",
                        this.deletableEmployeeId,
                        (err, res) => {
                            if (err) throw err;

                            // Select all employees to display
                            const dbS = new Db();
                            const connS = dbS.getConnection();
                            connS.connect(err => {
                                if (err) throw err;

                                const fsErrorHandler = err => { if (err) throw err; }
                                const sqlViewAllEmployeesById = fs.readFileSync("./dal/queries/viewAllEmployees.sql", "utf8", fsErrorHandler);
                                connS.query(sqlViewAllEmployeesById,
                                    (err, res) => {
                                        if (err) throw err;
                                        console.log("Employee deleted. Updated spreadsheet is as follows:")
                                        const strTable = cTable.getTable(res);
                                        console.log(strTable);
                                        connS.end();

                                        if (callback) callback();
                                    });
                            }); // connect

                        });
                    conn.end();
                }); // connect


            } // deleteThenRead
    } // DalRemovedEmployee