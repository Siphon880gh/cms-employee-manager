/**
 * @file
 * 
 * Data access layer that adds a new employee record from inquirer answers
 * 
 */

const cTable = require("console.table");
const fs = require("fs");
const Db = require("./Db");

module.exports = class DalAddedRole {
    constructor(newRoleObj) {
        this.newRoleObj = newRoleObj;
    }
    createThenRead(callback) {
            // Insert new role record
            const db = new Db();
            const conn = db.getConnection();
            conn.connect(err => {
                if (err) throw err;

                /**
                 * At this point, example newRoleObj value:
                 *   newRoleObj: {
                 *      title: 'Auditing',
                 *      salary: 100000,
                 *      department_id: 2
                 *   }
                /** Insert into Employee table  */
                const { title, salary, department_id } = this.newRoleObj;
                const binds = [title, salary, department_id];
                conn.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
                    binds,
                    (err, res) => {
                        if (err) throw err;
                        // console.log("DAL Added Employee: Inserted new id VALUE", res.insertId);
                        // process.exit(0);


                        // Select all employees to display
                        const dbR = new Db();
                        const connR = dbR.getConnection();
                        connR.connect(err => {
                            if (err) throw err;

                            const fsErrorHandler = err => { if (err) throw err; }
                            const sqlViewAllRoles = fs.readFileSync("./dal/queries/viewAllRoles.sql", "utf8", fsErrorHandler);
                            connR.query(sqlViewAllRoles,
                                (err, res) => {
                                    if (err) throw err;
                                    console.log("Inserted new role at the bottom:")
                                    const strTable = cTable.getTable(res);
                                    console.log(strTable);
                                    connR.end();

                                    if (callback) callback();
                                });
                        }); // connect
                    });
                conn.end();
            }); // connect

        } // createThenRead
}