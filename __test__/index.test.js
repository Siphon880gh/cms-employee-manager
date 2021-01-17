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

describe("Testing table generation", () => {
    /** Test table generation by checking if having two
     *  header titles would produce two header borders
     *  from console.table's getTable method. 
     */
    test("Test table has at least two column borders for a 2x2 table", () => {
        const cTable = require("console.table");
        const testValueTwoColumnBorders = "-------  -------";
        const tableValues = [{
            header1: 'A',
            header2: 1
        }, {
            header1: 'B',
            header2: 2
        }];

        // Get the table text that would show to terminal
        const tableString = cTable.getTable(tableValues);

        // Show to terminal
        console.log(tableString);

        // Test table has at least two column borders
        expect(tableString).toEqual(expect.stringContaining(testValueTwoColumnBorders));
    });
});

describe("Testing EventEmitter for future Publish–Subscribe pattern implementation", () => { // Import events module
    var events = require('events');
    var eventEmitter = new events.EventEmitter();

    const constantEvents = {
        raiseFlag: "raise color"
    }
    const raiseFlagEventHandler = (color) => {
        console.log(`${color} flag`);
    }

    /** Delegate riase flag event handler */
    eventEmitter.on(constantEvents.raiseFlag, raiseFlagEventHandler);

    /** Emit raise flag event and pass a context of flag color red */
    const consoleSpy = jest.spyOn(console, "log");
    eventEmitter.emit(constantEvents.raiseFlag, "red");
    expect(consoleSpy).toHaveBeenCalledWith("red flag");
});