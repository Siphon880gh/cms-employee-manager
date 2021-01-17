/**
 * @file
 * Main Menu that lets user choose how to manage the employees.
 */

const inquirer = require("inquirer");

/** Inquirer that asks user how to manage the main menu, then emits the user option */
module.exports = {
    inquirer: () => {

        inquirer.prompt([{
                    name: "firstName",
                    message: "What is the employee's first name?"
                },
                {
                    name: "lastName",
                    message: "What is the employee's last name?"
                },
                {
                    name: "role",
                    message: "What is the employee's role?"
                },
                {
                    name: "manager",
                    message: "Who is the employee's manager"
                }

            ]).then(answers => {
                global.state = { answers: answers };
                console.log("ADD EMPLOYEE INQUIRER HANDLE ANSWERS -> GLOBAL STATE VALUE", global.state)
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }
}