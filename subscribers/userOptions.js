module.exports = {
    viewAllEmployees: (context) => {
        let { groupBy } = context;
        switch (groupBy) {
            case "DEPT":
                console.log("Viewing all employees by department:");
                break;

            case "MANAGER":
                console.log("Viewing all employees by manager:");
                break;

            default: // null
                console.log("Viewing all employees:");

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