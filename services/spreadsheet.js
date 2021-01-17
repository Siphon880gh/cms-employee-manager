/**
 * @file
 * This is a service layer that provides the business logic to show "spreadsheet" 
 * and other "spreadsheet manipulations" to the business user.
 * 
 * To keep separation of concerns, this business logic is not aware of Database
 * implementations. Database implementations are at the data access layer (DAL). 
 * The business side will call the data access layer to get database information.
 * 
 */

const cTable = require("console.table");
const eventEmitter = require("../globals/eventEmitter");
const DalViewAllEmployeesBy = require("../dal/DalViewAllEmployeesBy");

module.exports = {
    showSpreadsheetEmployees: function(context) {
        if (!context) context = {};
        const { sortBy } = context;
        // console.log("showSpreadsheetEmployees sortBy value", sortBy);
        // process.exit(0);
        const callbackToMainMenu = () => { global.eventEmitter.emit("Main Menu"); }

        switch (sortBy) {
            case "DEPT":
                var dalViewAllEmployeesBy = new DalViewAllEmployeesBy({ orderBy: "DEPT" });
                dalViewAllEmployeesBy.read(callbackToMainMenu);
                break;
            case "MANAGER":
                var dalViewAllEmployeesBy = new DalViewAllEmployeesBy({ orderBy: "MANAGER" });
                dalViewAllEmployeesBy.read(callbackToMainMenu);
                break;
            default:
                var dalViewAllEmployeesBy = new DalViewAllEmployeesBy();
                dalViewAllEmployeesBy.read(callbackToMainMenu);
        }
    }
}