/**
 * @file
 * This is a service layer that provides the business logic to show "spreadsheet" 
 * of employees, etc that the user chooses from the main menu or a submenu
 * 
 * To keep separation of concerns, this business logic is not aware of Database
 * implementations. Those are in a database access layer at models/.
 * 
 */

/** Business logic requires that the user sees a spreadsheet of employees */
const cTable = require("console.table");
const eventEmitter = require("../globals/eventEmitter");

// const employees = require("../models/employees");

module.exports = {
    showSpreadsheetEmployees: (context) => {
        if (!context) context = {};
        const { groupBy } = context;

        switch (groupBy) {
            case "DEPT":
                console.log("Servicing employee spreadsheet grouped by department:");
                global.eventEmitter.emit("Main Menu");
                break;
            case "MANAGER":
                console.log("Servicing employee spreadsheet grouped by manager:");
                global.eventEmitter.emit("Main Menu");
                break;
            default:
                console.log("Servicing employee spreadsheet:");
                global.eventEmitter.emit("Main Menu");
        }
    }
}