/**
 * @file
 * 
 * Data access layer that updates the selected employee's role id to new role id
 * 
 */

const cTable = require("console.table");
const fs = require("fs");
const Db = require("./Db");

module.exports = class DalUpdatedEmployeeRole {
        constructor(updatableEmployeeId, newRoleId) {
            this.updatableEmployeeId = updatableEmployeeId;
            this.newRoleId = newRoleId;
        }
        updateThenRead(callback) {
                /** Update employee record */
                const db = new Db();
                const conn = db.getConnection();
                conn.connect(err => {
                    if (err) throw err;

                    // console.log("DAL: Removed Employee deletableEmployeeId", this.deletableEmployeeId);
                    // throw "";

                    conn.query("UPDATE employee SET role_id=? WHERE id=?", [this.newRoleId, this.updatableEmployeeId],
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
                                        console.log("Employee's role updated. Updated spreadsheet is as follows:")
                                        const strTable = cTable.getTable(res);
                                        console.log(strTable);
                                        connS.end();

                                        if (callback) callback();
                                    });
                            }); // connect

                        });
                    conn.end();
                }); // connect


            } // updateThenRead
    } // DalUpdatedEmployeeRole