const process = require("process");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql2 = require("mysql2");

const asciiArtTitle = require("./views/asciiArtTitle.js");
const mainMenu = require("./views/cli/mainMenu")

/**
 * UX Flow: Show ASCII Art Title "Employees Manager", 
 *          then ask how user wants to manage the Employees
 */

asciiArtTitle.displayAsciiArtTitle();

mainMenu.inquirer();