/** 
 * @global constantMenuOptions
 * The questions that serve as inquirer messages that the user sees in a list
 * The questions also serves as events that eventEmitter emits. 
 * 
 * */

/** Constants for Main Menu Inquirer choices, custom events, and event handlers */
const constantMenuOptions = {
    viewAllEmployees: "View All Employees",
    viewAllEmployeesByDept: "View All Employees Sorted By Department",
    viewAllEmployeesByManager: "View All Employees Sorted By Manager",
    viewAllDepartments: "View All Departments",
    addDepartment: "Add Department",
    viewAllRoles: "View All Roles",
    addRole: "Add Role",
    addEmployee: "Add Employee",
    removeEmployee: "Remove Employee",
    updateEmployeeRole: "Update Employee Role",
    updateEmployeeManager: "Update Employee Manager",
    exit: "-- Exit --",
    mainMenu: "Main Menu"
}

/** Constants for Secondary Menu Inquirer custom events and event handlers. 
 *  The string concatenation is make sure the values are different from the main menu constants
 */
constantMenuOptions.answeredAddDepartment = "Answered " + constantMenuOptions.addDepartment;
constantMenuOptions.answeredAddRole = "Answered " + constantMenuOptions.addRole;
constantMenuOptions.answeredAddEmployee = "Answered " + constantMenuOptions.addEmployee;
constantMenuOptions.answeredRemoveEmployee = "Answered " + constantMenuOptions.removeEmployee;
constantMenuOptions.answeredUpdateEmployeeRole = "Answered " + constantMenuOptions.updateEmployeeRole;

module.exports = constantMenuOptions;