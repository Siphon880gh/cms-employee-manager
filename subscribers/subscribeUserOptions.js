/**
 * @file
 * These are subscribers that listen to user options from the Main Menu.
 * 
 * For options that don't require additional input (such as viewing all employees),
 * we will call the appropriate service (which has the business logic).
 * 
 * For options that require additional input, we will call additional views (views/cli).
 * 
 * Generally the flow is like this:
 * CLI View -> Subscribers -> Service -> Data Access Layer -> Service -> CLI View
 * 
 */

const {
    showSpreadsheetEmployees,
    showSpreadsheetDepartments,
    showSpreadsheetRoles,
    hirerAddsEmployee,
    hirerAddedEmployee,
    hirerRemoveEmployee,
    hirerRemovedEmployee,
    hirerUpdateEmployeeRole,
    hirerUpdatedEmployeeRole,
    hirerUpdateEmployeeManager,
    hirerUpdatedEmployeeManager,
    hrAddDepartment,
    hrAddedDepartment
} = require("../services/spreadsheet");

module.exports = {
    viewAllEmployees: (context) => {
        if (!context) context = {};
        let { groupBy } = context;

        switch (groupBy) {
            case "DEPT":
                console.log("Viewing all employees by department:");
                showSpreadsheetEmployees({ sortBy: "DEPT" });
                break;

            case "MANAGER":
                console.log("Viewing all employees by manager:");
                showSpreadsheetEmployees({ sortBy: "MANAGER" });
                break;

            default: // null
                console.log("Viewing all employees:");
                showSpreadsheetEmployees();

        }
    },


    viewAllDepartments: () => {
        console.log("Viewing all departments:");
        showSpreadsheetDepartments();
    },
    addDepartment: () => {
        // console.log("Subscriber: Fill information on the new department:");
        hrAddDepartment();
    },
    answeredAddDepartment: (newDepartmentObj) => {
        hrAddedDepartment(newDepartmentObj);
    },


    viewAllRoles: () => {
        console.log("Viewing all roles:");
        showSpreadsheetRoles();
    },


    addEmployee: () => {
        // console.log("Subscriber: Fill information on the new employee:");
        hirerAddsEmployee();

    },
    answeredAddEmployee: (newEmployeeObj) => {
        // console.log("Subscriber: Showing spreadsheet of all employees with the newly created employee:");
        // console.log(newEmployeeObj);
        hirerAddedEmployee(newEmployeeObj);
    },


    removeEmployee: () => {
        // console.log("Which employee do you want to remove?");
        hirerRemoveEmployee();

    },
    answeredRemoveEmployee: (inquirerAnswerWrappingDeletableEmployeeId) => {
        const { deletableEmployeeId } = inquirerAnswerWrappingDeletableEmployeeId;
        hirerRemovedEmployee(deletableEmployeeId);

    },


    updateEmployeeRole: () => {
        // console.log("Which employee's role do you want to update?");
        hirerUpdateEmployeeRole();

    },
    answeredUpdateEmployeeRole: (inquirerAnswerWrappingUpdatableEmployeeIdAndNewRoleId) => {
        const { updatableEmployeeId, newRoleId } = inquirerAnswerWrappingUpdatableEmployeeIdAndNewRoleId;
        hirerUpdatedEmployeeRole(updatableEmployeeId, newRoleId);
    },


    updateEmployeeManager: () => {
        // console.log("Which employee's manager do you want to update?");
        hirerUpdateEmployeeManager();

    },
    answeredUpdateEmployeeManager: (inquirerAnswerWrappingUpdatableEmployeeIdAndNewManagerId) => {
        const { updatableEmployeeId, newManagerId } = inquirerAnswerWrappingUpdatableEmployeeIdAndNewManagerId;
        hirerUpdatedEmployeeManager(updatableEmployeeId, newManagerId);
    },


    exit: () => {
        console.log("\nThank you for using Employee Manager.");
        process.exit(0)
    }
}