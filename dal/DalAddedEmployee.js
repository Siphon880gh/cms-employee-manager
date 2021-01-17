/**
 * @file
 * 
 * Data access layer that shows all roles joining with department table so that department fields 
 * have names instead of Id's.
 * 
 */

const cTable = require("console.table");
const fs = require("fs");
const Db = require("./Db")

module.exports = class DalAddedEmployee {
        constructor() {}
        read(callback) {
                console.log("Showing database of updated employees");
            } // read
    } // DalAddedEmployee