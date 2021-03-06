/**
 * @file
 * Inquirer CLI for inputting fields to new employee
 * 
 * Architecture Note:
 * We will break the pattern of going from service to data access 
 * layer because of limited time available for coding. May refactor
 * in the future. This is at listing the employees and managers.
 * 
 */

const inquirer = require("inquirer");
const Db = require("../../dal/Db");

/** Inquirer that asks user how to manage the main menu, then emits the user option */
module.exports = {
    inquirer: () => {

            let questionObjs = [{
                    name: "firstName",
                    message: "What is the employee's first name?"
                },
                {
                    name: "lastName",
                    message: "What is the employee's last name?"
                },
                {
                    name: "role",
                    message: "What is the employee's role?",
                    type: "list",
                    choices: [

                    ]
                },
                {
                    name: "manager",
                    message: "Who is the employee's manager",
                    type: "list",
                    choices: [

                    ]
                }
            ];

            // Prepare role choices
            const dbRole = new Db();
            const connRole = dbRole.getConnection();
            connRole.connect(err => {
                if (err) throw err;

                connRole.query("SELECT id, title FROM role", (err, res) => {
                    if (err) throw err;
                    // console.log("ALL ROLES VAL", res);

                    // Inquirer list can have different values (role id) than what is displayed (role name)
                    var roleChoices = res.map(TextRow => {
                        return {
                            name: TextRow.title,
                            value: parseInt(TextRow.id)
                        }
                    });
                    questionObjs[2].choices = roleChoices;
                    connRole.end();
                });
            });

            // Prepare manager choices
            const dbManager = new Db();
            const connManager = dbManager.getConnection();
            connManager.connect(err => {
                if (err) throw err;

                connManager.query("SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee", (err, res) => {
                    if (err) throw err;
                    // console.log("ALL ROLES VAL", res);

                    // Inquirer list can have different values (manager id) than what is displayed (manager name)
                    var managerChoices = res.map(TextRow => {
                        return {
                            name: TextRow.name,
                            value: parseInt(TextRow.id)
                        }
                    });
                    questionObjs[3].choices = managerChoices;
                    connManager.end();

                    inquirer.prompt(questionObjs).then(answers => {

                            // Save answers to global state. The services/spreadsheet.js is watching the global state to return from inquirer.
                            global.state = { answers };
                        })
                        .catch(err => {
                            console.log("Error: ", err);
                        })

                }); // query
            }); // connect


        } // inquirer
}