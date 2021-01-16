const inquirer = require("inquirer");

module.exports = {
    inquirer: () => {
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
                    constantMenuOptions.exit,
                ]
            }]).then(answers => {
                const { menuOption } = answers;
                switch (menuOption) {
                    case constantMenuOptions.viewAllEmployees:
                        console.log("Viewing all employees:");
                        break;
                    case constantMenuOptions.viewAllEmployeesByDept:
                        console.log("Viewing all employees by department:");
                        break;
                    case constantMenuOptions.viewAllEmployeesByManager:
                        console.log("Viewing all employees by manager:");
                        break;
                    case constantMenuOptions.addEmployee:
                        console.log("Fill information on the new employee:");
                        break;
                    case constantMenuOptions.removeEmployee:
                        console.log("Which employee do you want to remove?");
                        break;
                    case constantMenuOptions.updateEmployeeRole:
                        console.log("Which employee's role do you want to update?");
                        break;
                    case constantMenuOptions.updateEmployeeManager:
                        console.log("Which employee's manager do you want to update?");
                        break;
                    case constantMenuOptions.exit:
                        console.log("Thank you for using Employee Manager.");
                        process.exit(0)
                        break;
                }
            })
            .catch(err => {
                console.log("Error: ", err);
            })
    }
}