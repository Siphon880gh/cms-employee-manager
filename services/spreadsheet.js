/**
 * @file
 * This is a service layer that provides the business logic to show "spreadsheet" 
 * of employees, etc that the user chooses from the main menu or a submenu
 * 
 * Database implementation are not here. That will be in a database access layer
 * at models/, for separation of concerns.
 * 
 */

// const employees = require("../models/employees");

module.exports = {
    showSpreadsheetEmployees: (context) => {
        if (!context) context = {};
        const { groupBy } = context;

        switch (groupBy) {
            case "DEPT":
                console.log("Servicing employee spreadsheet grouped by department:")
                break;
            case "MANAGER":
                console.log("Servicing employee spreadsheet grouped by manager:")
                break;
            default:
                console.log("Servicing employee spreadsheet:")
        }
    }
}