/**
 * @file
 * Inquirer CLI for selecting employee to update his/her role
 * 
 * Architecture Note:
 * We will break the pattern of going from service to data access 
 * layer because of limited time available for coding. May refactor
 * in the future. This is at updating employee's role.
 * 
 */

const inquirer = require("inquirer");
const Db = require("../../dal/Db");

/** Inquirer that asks user how to manage the main menu, then emits the user option */
module.exports = {
    inquirer: () => {

            let questionObjs = [{
                    name: "updatableEmployeeId",
                    message: "Which employee's role do you want to update?",
                    type: "list",
                    choices: []
                },
                {
                    name: "newRoleId",
                    message: "Which role do you want to set for the selected employee?",
                    type: "list",
                    choices: []
                }
            ];

            // Prepare employee choices
            const dbEmp = new Db();
            const connEmp = dbEmp.getConnection();
            connEmp.connect(err => {
                if (err) throw err;

                connEmp.query("SELECT id, CONCAT(first_name, ' ', last_Name) AS name FROM employee", (err, res) => {
                    if (err) throw err;
                    // console.log("ALL ROLES VAL", res);

                    // Inquirer list can have different values (role id) than what is displayed (role name)
                    var empChoices = res.map(TextRow => {
                        return {
                            name: TextRow.name,
                            value: parseInt(TextRow.id)
                        }
                    });
                    questionObjs[0].choices = empChoices;
                    connEmp.end();


                    // Prepare role choices
                    const dbR = new Db();
                    const connR = dbR.getConnection();
                    connR.connect(err => {
                        if (err) throw err;

                        connR.query("SELECT id, title FROM role", (err, res) => {
                            var reChoices = res.map(TextRow => {
                                return {
                                    name: TextRow.title,
                                    value: parseInt(TextRow.id)
                                }
                            });
                            questionObjs[1].choices = reChoices;
                            connR.end();
                        });
                    });


                    // Save answers to global state. The services/spreadsheet.js is watching the global state to return from inquirer.
                    inquirer.prompt(questionObjs).then(answers => {

                            global.state = answers;
                            // console.log("CLI update employee role answers should contain updatable employee id and the new role id", global.state);
                            // throw "";
                        })
                        .catch(err => {
                            console.log("Error: ", err);
                        })


                });
            });

        } // inquirer
}