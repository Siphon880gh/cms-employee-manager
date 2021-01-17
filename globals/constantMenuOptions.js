/** 
 * @global constantMenuOptions
 * The questions that serve as inquirer messages that the user sees in a list
 * The questions also serves as events that eventEmitter emits. 
 * 
 * */

const constantMenuOptions = {
    viewAllEmployees: "View All Employees",
    viewAllEmployeesByDept: "View All Employees By Department",
    viewAllEmployeesByManager: "View All Employees By Manager",
    viewAllDepartments: "View All Departments",
    viewAllRoles: "View All Roles",
    addEmployee: "Add Employee",
    removeEmployee: "Remove Employee",
    updateEmployeeRole: "Update Employee Role",
    updateEmployeeManager: "Update Employee Manager",
    exit: "-- Exit --",
    mainMenu: "Main Menu"
}

module.exports = constantMenuOptions;