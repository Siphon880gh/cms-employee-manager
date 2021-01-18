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

module.exports = class DalAddedEmployee {
    constructor(newEmployeeObj) {
        this.newEmployeeObj = newEmployeeObj;
    }
    createThenRead(callback) {
            // Insert new employee record
            const db = new Db();
            const conn = db.getConnection();
            conn.connect(err => {
                if (err) throw err;

                /**
                 * At this point, example newEmployeeObj value:
                 *   newEmployeeObj: {
                 *      firstName: 'John',
                 *      lastName: 'Doe',
                 *      role: 2
                 *      manager: 5
                 *   }
                /** Insert into Employee table  */
                const { firstName, lastName, role, manager } = this.newEmployeeObj;
                const binds = [firstName, lastName, role, manager];
                conn.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
                    binds,
                    (err, res) => {
                        if (err) throw err;
                        // console.log("DAL Added Employee: Inserted new id VALUE", res.insertId);
                        // process.exit(0);


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
                                    console.log("Inserted new employee at the bottom:")
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