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
const callbackToMainMenu = () => { global.eventEmitter.emit("Main Menu"); }

module.exports = {
    showSpreadsheetEmployees: function(context) {
        const DalViewAllEmployeesBy = require("../dal/DalViewAllEmployeesBy");
        if (!context) context = {};
        const { sortBy } = context;
        // console.log("showSpreadsheetEmployees sortBy value", sortBy);
        // process.exit(0);

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

        // Go to data access layer
        var dalViewAllDepartments = new DalViewAllDepartments({ orderBy: "DEPT" });

        // Return to main menu
        dalViewAllDepartments.read(callbackToMainMenu);
    },

    showSpreadsheetRoles: function(context) {
        const DalViewAllRoles = require("../dal/DalViewAllRoles");
        if (!context) context = {};
        const { sortBy } = context;

        // Go to data access layer
        var dalViewAllRoles = new DalViewAllRoles({ orderBy: "DEPT" });

        // Return to main menu
        dalViewAllRoles.read(callbackToMainMenu);
    },
    hirerAddsEmployee: function() {
        const { eventEmitter } = global;

        // Force Inquirer to give us the answer values outside of Inquirer with a global state
        global.state = {};
        const cliAddEmployee = require("../views/cli/addEmployee");
        cliAddEmployee.inquirer();

        // Check until global.state is filled with answers
        var tempWaitInquirer = setInterval(function() {
            if (Object.keys(global.state).length) {
                // console.log("Service: global state add employee answers", global.state);
                clearInterval(tempWaitInquirer);

                // We have the global.state filled with Add Employee information. Lets get it to the database and show the new database:
                eventEmitter.emit(constantMenuOptions.answeredAddEmployee, global.state.answers);
            }
        }, 100);

    },
    hirerAddedEmployee: function(newEmployeeObj) {
        const DalAddedEmployee = require("../dal/DalAddedEmployee");
        // console.log("Service: Hirer added employee", newEmployeeObj);

        var dalAddedEmployee = new DalAddedEmployee(newEmployeeObj);
        dalAddedEmployee.createThenRead(callbackToMainMenu);
    },
    hirerRemoveEmployee: function() {
        const { eventEmitter } = global;

        // Force Inquirer to give us the answer values outside of Inquirer with a global state
        global.state = {};
        const cliRemoveEmployee = require("../views/cli/removeEmployee");
        cliRemoveEmployee.inquirer();

        // Check until global.state is filled with answers
        var tempWaitInquirer = setInterval(function() {
            if (Object.keys(global.state).length) {
                // console.log("Service: global state add employee answers", global.state);
                clearInterval(tempWaitInquirer);

                // console.log("Service: GLOBAL STATE VAL: ", global.state);
                // throw "";

                // We have the global.state filled with Remove Employee information. Lets get it to the database and show the updated database:
                const inquirerAnswerWrappingDeletableEmployeeId = global.state;
                eventEmitter.emit(constantMenuOptions.answeredRemoveEmployee, inquirerAnswerWrappingDeletableEmployeeId);
            }
        }, 100);

    },
    hirerRemovedEmployee: function(deletableEmployeeId) {
        const DalRemovedEmployee = require("../dal/DalRemovedEmployee");
        console.log("Service: Hirer removed employee", deletableEmployeeId);

        var dalRemovedEmployee = new DalRemovedEmployee(deletableEmployeeId);
        dalRemovedEmployee.deleteThenRead(callbackToMainMenu);
    }
}