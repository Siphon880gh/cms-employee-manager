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

describe("Testing title ascii art", () => {
    /** Test title ascii art by checking if border text art _______ is a substring 
     *  and also whether console.log was passed the title ascii art.
     */
    const asciiArtDisplayer = require("../views/asciiArtTitle.js");
    const asciiArtDisplayerText = asciiArtDisplayer.text;
    const testValueAsciiBorder = "_______";

    test("Test title ascii art value", () => {
        expect(asciiArtDisplayerText).toEqual(expect.stringContaining(testValueAsciiBorder));
    });
    test("Test title ascii art console.log", () => {
        const consoleSpy = jest.spyOn(console, "log");

        asciiArtDisplayer.displayAsciiArtTitle();
        expect(consoleSpy).toHaveBeenCalledWith(asciiArtDisplayerText);
    })
});