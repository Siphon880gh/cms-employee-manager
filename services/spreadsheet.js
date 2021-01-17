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
// const eventEmitter = require("../globals/eventEmitter");

module.exports = {
    showSpreadsheetEmployees: function(context) {
        const DalViewAllEmployeesBy = require("../dal/DalViewAllEmployeesBy");
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
    },

    showSpreadsheetDepartments: function(context) {
        const DalViewAllDepartments = require("../dal/DalViewAllDepartments");
        if (!context) context = {};
        const { sortBy } = context;
        const callbackToMainMenu = () => { global.eventEmitter.emit("Main Menu"); }

        var dalViewAllDepartments = new DalViewAllDepartments({ orderBy: "DEPT" });
        dalViewAllDepartments.read(callbackToMainMenu);
    },

    showSpreadsheetRoles: function(context) {
        const DalViewAllRoles = require("../dal/DalViewAllRoles");
        if (!context) context = {};
        const { sortBy } = context;
        const callbackToMainMenu = () => { global.eventEmitter.emit("Main Menu"); }

        var dalViewAllRoles = new DalViewAllRoles({ orderBy: "DEPT" });
        dalViewAllRoles.read(callbackToMainMenu);
    },
    hirerAddsEmployee: function() {
        const { eventEmitter } = global;
        const DalAddEmployee = require("../dal/DalAddEmployee");
        console.log("Hirer adding employee");

        // Creating to database
        var dalAddEmployee = new DalAddEmployee();
        dalAddEmployee.create();

        // Trigger event to go to next screen: Show updated spreadsheet
        eventEmitter.emit(constantMenuOptions.answeredAddEmployee);
    },
    hirerAddedEmployee: function() {
        const DalAddedEmployee = require("../dal/DalAddedEmployee");
        console.log("Hirer added employee");

        var dalAddedEmployee = new DalAddedEmployee();
        dalAddedEmployee.read();
    }
}