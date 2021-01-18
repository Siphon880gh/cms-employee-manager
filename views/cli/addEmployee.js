/**
 * @file
 * Main Menu that lets user choose how to manage the employees.
 * 
 * Architecture Note:
 * For listing the employees and managers, we will break the pattern 
 * of going from service to data access layer because of limited
 * time available for development. May refactor in the future.
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

                    var roleChoices = res.map(TextRow => `${TextRow.id}. ${TextRow.title}`);
                    questionObjs[2].choices = roleChoices;
                    connRole.end();

                });
            });

            inquirer.prompt(questionObjs).then(answers => {
                    global.state = { answers: answers };
                })
                .catch(err => {
                    console.log("Error: ", err);
                })

        } // inquirer
}