/**
 * @file
 * Inquirer CLI for adding new department to department table.
 * 
 */

const inquirer = require("inquirer");
const Db = require("../../dal/Db");

/** Inquirer that asks user how to manage the main menu, then emits the user option */
module.exports = {
    inquirer: () => {

            let questionObjs = [{
                name: "newDepartmentName",
                message: "What is the new department's name?"
            }];

            inquirer.prompt(questionObjs).then(answers => {

                    // Save answers to global state. The services/spreadsheet.js is watching the global state to return from inquirer.
                    global.state = { answers };
                })
                .catch(err => {
                    console.log("Error: ", err);
                })


        } // inquirer
}