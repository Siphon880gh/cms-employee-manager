/**
 * @file
 * Main Menu that lets user choose how to manage the employees.
 * 
 * To keep the code organized, each user option will emit
 * an event to have another inquirer view take over, following
 * a Publisher-Subscriber pattern. Also, the user options will
 * be constants to prevent typos that break the code when adding
 * new user options.
 * 
 */

const inquirer = require("inquirer");

/** The questions that serve as inquirer messages and events */
const constantMenuOptions = {
    viewAllEmployees: "View All Employees",
    viewAllEmployeesByDept: "View All Employees By Department",
    viewAllEmployeesByManager: "View All Employees By Manager",
    addEmployee: "Add Employee",
    removeEmployee: "Remove Employee",
    updateEmployeeRole: "Update Employee Role",
    updateEmployeeManager: "Update Employee Manager",
    exit: "-- Exit --"
}

/** Setup Publisher-Subscriber pattern in the main menu */
const events = require('events');
const eventEmitter = new events.EventEmitter();

/** Subscribers that hold the event handlers for the async user options
 *  Note: The subscriber viewAllEmployees will handle viewing all employees, employees grouped by Department, 
 *        and employees grouped by Manager 
 */
const subscribers = require("../../subscribers/userOptions");
eventEmitter.on(constantMenuOptions.viewAllEmployees, subscribers.viewAllEmployees);
eventEmitter.on(constantMenuOptions.viewAllEmployeesByDept, subscribers.viewAllEmployees);
eventEmitter.on(constantMenuOptions.viewAllEmployeesByManager, subscribers.viewAllEmployees);
eventEmitter.on(constantMenuOptions.addEmployee, subscribers.addEmployee);
eventEmitter.on(constantMenuOptions.removeEmployee, subscribers.removeEmployee);
eventEmitter.on(constantMenuOptions.updateEmployeeRole, subscribers.updateEmployeeRole);
eventEmitter.on(constantMenuOptions.updateEmployeeManager, subscribers.updateEmployeeManager);
eventEmitter.on(constantMenuOptions.exit, subscribers.exit);

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
                    case constantMenuOptions.addEmployee:
                        break;
                    case constantMenuOptions.removeEmployee:
                        break;
                    case constantMenuOptions.updateEmployeeRole:
                        break;
                    case constantMenuOptions.updateEmployeeManager:
                        break;
                    case constantMenuOptions.exit:
                        break;
                }
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }
}