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

/** Inquirer will give a list of choices. These choices will be filled in from MySQL */
module.exports = {
    inquirer: () => {

            let questionObjs = [{
                    name: "title",
                    message: "What is new job role called?",
                    validate: input => Boolean(input.length)
                },
                {
                    name: "salary",
                    message: "What is the annual salary?",
                    type: "number",
                    validate: input => {
                        if (isNaN(input) || typeof input !== "number")
                            return "Hint: Please enter a number!"
                        else
                            return true;
                    }
                },
                {
                    name: "department_id",
                    message: "Which department does this role belongs to?",
                    type: "list",
                    choices: [

                    ]
                }
            ];

            // Prepare department choices
            const dbRole = new Db();
            const connRole = dbRole.getConnection();
            connRole.connect(err => {
                if (err) throw err;

                connRole.query("SELECT id, name FROM department", (err, res) => {
                    if (err) throw err;
                    // console.log("ALL ROLES VAL", res);

                    // Inquirer list can have different values (department id) than what is displayed (department name)
                    var roleChoices = res.map(TextRow => {
                        return {
                            name: TextRow.name,
                            value: parseInt(TextRow.id)
                        }
                    });
                    questionObjs[2].choices = roleChoices;
                    connRole.end();


                    // Save answers to global state. The services/spreadsheet.js is watching the global state to return from inquirer.
                    inquirer.prompt(questionObjs).then(answers => {
                            global.state = { answers };
                        })
                        .catch(err => {
                            console.log("Error: ", err);
                        })

                });
            });

        } // inquirer
}