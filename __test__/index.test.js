const process = require("process");
const inquirer = require("inquirer");
const mysql2 = require("mysql2");

const fs = require('fs');

/** Testing env file. That file may not exist on other copies 
 * because it's untracked from git. Test only if file exists.
 */
if (fs.existsSync("./config/.env")) {
    describe("Testing env file", () => {
        test("Test env file on os with MAMP-style MySQL", () => {

            require("dotenv").config({ path: "./config/.env" });
            const process = require("process");

            const mySQLPort = process.env.MAMP_MYSQL_PORT || 3306;
            expect(parseInt(mySQLPort)).toBe(8889);
        });
    });
}