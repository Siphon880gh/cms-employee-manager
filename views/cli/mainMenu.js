/**
 * @file
 * Main Menu that lets user choose how to manage the employees.
 */

const inquirer = require("inquirer");

/** Inquirer that asks user how to manage the main menu, then emits the user option */
module.exports = {
    inquirer: () => {

        inquirer.prompt([{
                name: "menuOption",
                message: "What would you like to do?",
                type: "list",
                choices: [
                    constantMenuOptions.viewAllEmployees,
                    constantMenuOptions.viewAllEmployeesByDept,
                    constantMenuOptions.viewAllEmployeesByManager,
                    constantMenuOptions.viewAllDepartments,
                    constantMenuOptions.addDepartment,
                    constantMenuOptions.viewAllRoles,
                    constantMenuOptions.addRole,
                    constantMenuOptions.addEmployee,
                    constantMenuOptions.removeEmployee,
                    constantMenuOptions.updateEmployeeRole,
                    constantMenuOptions.updateEmployeeManager,
                    constantMenuOptions.exit
                ]
            }]).then(answers => {
                const { menuOption } = answers;
                switch (menuOption) {
                    case constantMenuOptions.viewAllEmployees:
                        eventEmitter.emit(constantMenuOptions.viewAllEmployees);
                        break;
                    case constantMenuOptions.viewAllEmployeesByDept:
                        eventEmitter.emit(constantMenuOptions.viewAllEmployees, { groupBy: "DEPT" });
                        break;
                    case constantMenuOptions.viewAllEmployeesByManager:
                        eventEmitter.emit(constantMenuOptions.viewAllEmployees, { groupBy: "MANAGER" });
                        break;
                    case constantMenuOptions.viewAllDepartments:
                        eventEmitter.emit(constantMenuOptions.viewAllDepartments);
                        break;
                    case constantMenuOptions.addDepartment:
                        eventEmitter.emit(constantMenuOptions.addDepartment);
                        break;
                    case constantMenuOptions.viewAllRoles:
                        eventEmitter.emit(constantMenuOptions.viewAllRoles);
                        break;
                    case constantMenuOptions.addRole:
                        eventEmitter.emit(constantMenuOptions.addRole);
                        break;
                    case constantMenuOptions.addEmployee:
                        eventEmitter.emit(constantMenuOptions.addEmployee);
                        break;
                    case constantMenuOptions.removeEmployee:
                        eventEmitter.emit(constantMenuOptions.removeEmployee);
                        break;
                    case constantMenuOptions.updateEmployeeRole:
                        eventEmitter.emit(constantMenuOptions.updateEmployeeRole);
                        break;
                    case constantMenuOptions.updateEmployeeManager:
                        eventEmitter.emit(constantMenuOptions.updateEmployeeManager);
                        break;
                    case constantMenuOptions.exit:
                        eventEmitter.emit(constantMenuOptions.exit);
                        break;
                }
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }
}