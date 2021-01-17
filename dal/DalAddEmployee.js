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

module.exports = class DalAddEmployee {
        constructor() {}
        create(callback) {
                console.log("Creating to database");
            } // read
    } // DalAddEmployee