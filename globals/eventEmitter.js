/** 
 * 
 * @global eventEmitter
 * Setup Publisher-Subscriber pattern in entire app to emit user options from Inquirer CLI.
 * 
 * Some user options are separated into two or more rounds of going from Subscriber -> Service -> Data Access Layer,
 * because of how many intermediate Inquirer screens there are. 
 * 
 */

const events = require('events');
const eventEmitter = new events.EventEmitter();
const constantMenuOptions = require("../globals/constantMenuOptions");

/** Subscribers that hold the event handlers for the async user options
 *  Note: The subscriber viewAllEmployees will handle viewing all employees, employees grouped by Department, 
 *        and employees grouped by Manager 
 */
const subscribers = require("../subscribers/subscribeUserOptions");
eventEmitter.on(constantMenuOptions.viewAllEmployees, subscribers.viewAllEmployees);
eventEmitter.on(constantMenuOptions.viewAllEmployeesByDept, subscribers.viewAllEmployees);
eventEmitter.on(constantMenuOptions.viewAllEmployeesByManager, subscribers.viewAllEmployees);

eventEmitter.on(constantMenuOptions.viewAllDepartments, subscribers.viewAllDepartments);
eventEmitter.on(constantMenuOptions.addDepartment, subscribers.addDepartment);
eventEmitter.on(constantMenuOptions.answeredAddDepartment, subscribers.answeredAddDepartment);

eventEmitter.on(constantMenuOptions.viewAllRoles, subscribers.viewAllRoles);
eventEmitter.on(constantMenuOptions.addRole, subscribers.addRole);
eventEmitter.on(constantMenuOptions.answeredAddRole, subscribers.answeredAddRole);

eventEmitter.on(constantMenuOptions.addEmployee, subscribers.addEmployee);
eventEmitter.on(constantMenuOptions.answeredAddEmployee, subscribers.answeredAddEmployee);

eventEmitter.on(constantMenuOptions.removeEmployee, subscribers.removeEmployee);
eventEmitter.on(constantMenuOptions.answeredRemoveEmployee, subscribers.answeredRemoveEmployee);

eventEmitter.on(constantMenuOptions.updateEmployeeRole, subscribers.updateEmployeeRole);
eventEmitter.on(constantMenuOptions.answeredUpdateEmployeeRole, subscribers.answeredUpdateEmployeeRole);

eventEmitter.on(constantMenuOptions.updateEmployeeManager, subscribers.updateEmployeeManager);
eventEmitter.on(constantMenuOptions.answeredUpdateEmployeeManager, subscribers.answeredUpdateEmployeeManager);

eventEmitter.on(constantMenuOptions.exit, subscribers.exit);
eventEmitter.on(constantMenuOptions.mainMenu, returnToMainMenu);

function returnToMainMenu() {
    const mainMenu = require("../views/cli/mainMenu");
    mainMenu.inquirer();
}

module.exports = eventEmitter;