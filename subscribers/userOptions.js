/**
 * @file
 * These are subscribers that listen to user options from the Main Menu.
 * 
 * For options that don't require additional input (such as viewing all employees),
 * we will call the appropriate service (which has the business logic).
 * 
 * For options that require additional input, we will call additional views (views/cli).
 * 
 */

const { showSpreadsheetEmployees } = require("../services/spreadsheet");

module.exports = {
    viewAllEmployees: (context) => {
        if (!context) context = {};
        let { groupBy } = context;

        switch (groupBy) {
            case "DEPT":
                console.log("Viewing all employees by department:");
                showSpreadsheetDepartments();
                break;

            case "MANAGER":
                console.log("Viewing all employees by manager:");
                showSpreadsheetEmployees();
                break;

            default: // null
                console.log("Viewing all employees:");
                showSpreadsheetEmployees();

        }
    },
    addEmployee: () => {
        console.log("Fill information on the new employee:");

    },
    removeEmployee: () => {
        console.log("Which employee do you want to remove?");

    },
    updateEmployeeRole: () => {
        console.log("Which employee's role do you want to update?");

    },
    updateEmployeeManager: () => {
        console.log("Which employee's manager do you want to update?");

    },
    exit: () => {
        console.log("\nThank you for using Employee Manager.");
        process.exit(0)
    }
}