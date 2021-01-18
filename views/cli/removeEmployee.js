/**
 * @file
 * Inquirer CLI for selecting employee to remove
 * 
 * Architecture Note:
 * We will break the pattern of going from service to data access 
 * layer because of limited time available for coding. May refactor
 * in the future. This is at listing the employees to remove.
 * 
 */

const inquirer = require("inquirer");
const Db = require("../../dal/Db");

/** Inquirer that asks user how to manage the main menu, then emits the user option */
module.exports = {
    inquirer: () => {

            let questionObjs = [{
                name: "deletableEmployeeId",
                message: "Which employee do you want to remove?",
                type: "list",
                choices: []
            }];

            // Prepare role choices
            const dbRe = new Db();
            const connRe = dbRe.getConnection();
            connRe.connect(err => {
                if (err) throw err;

                connRe.query("SELECT id, CONCAT(first_name, ' ', last_Name) AS name FROM employee", (err, res) => {
                    if (err) throw err;
                    // console.log("ALL ROLES VAL", res);

                    // Inquirer list can have different values (role id) than what is displayed (role name)
                    var reChoices = res.map(TextRow => {
                        return {
                            name: TextRow.name,
                            value: parseInt(TextRow.id)
                        }
                    });
                    questionObjs[0].choices = reChoices;
                    connRe.end();

                    // Save answers to global state. The services/spreadsheet.js is watching the global state to return from inquirer.
                    inquirer.prompt(questionObjs).then(answers => {

                            global.state = answers;
                            // console.log("CLI remove employee answers", global.state);
                            // throw "";
                        })
                        .catch(err => {
                            console.log("Error: ", err);
                        })


                });
            });

        } // inquirer
}