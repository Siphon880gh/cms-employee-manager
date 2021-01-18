/**
 * @file
 * 
 * Data access layer that adds a new department record from inquirer answers
 * 
 */

const cTable = require("console.table");
const fs = require("fs");
const Db = require("./Db");

module.exports = class DalAddedDepartment {
    constructor(newDepartmentName) {
        this.newDepartmentName = newDepartmentName;
    }
    createThenRead(callback) {
            // Insert new department record
            const db = new Db();
            const conn = db.getConnection();
            conn.connect(err => {
                if (err) throw err;

                /** Insert into Department table  */
                conn.query("INSERT INTO department (name) VALUES (?)",
                    this.newDepartmentName,
                    (err, res) => {
                        if (err) throw err;
                        // console.log("DAL Added Employee: Inserted new id VALUE", res.insertId);
                        // process.exit(0);


                        // Select all employees to display
                        const dbS = new Db();
                        const connS = dbS.getConnection();
                        connS.connect(err => {
                            if (err) throw err;

                            connS.query("SELECT * FROM department",
                                (err, res) => {
                                    if (err) throw err;
                                    console.log("Inserted new department at the bottom:")
                                    const strTable = cTable.getTable(res);
                                    console.log(strTable);
                                    connS.end();

                                    if (callback) callback();
                                });
                        }); // connect
                    });
                conn.end();
            }); // connect

        } // createThenRead
}