const process = require("process");
const inquirer = require("inquirer");
const mysql2 = require("mysql2");

/**
 * 
 * Globals:
 * To keep the code organized, following a Publisher-Subscriber
 * pattern, each user option will emit an event to have another 
 * inquirer view take over. Also, the user options will be 
 * constants to prevent typos that break the code when adding
 * new user options. The globals will be required 
 * 
 */
const eventEmitter = require("./globals/eventEmitter");
const constantMenuOptions = require("./globals/constantMenuOptions");
global.eventEmitter = eventEmitter;
global.constantMenuOptions = constantMenuOptions;


/**
 * UX Flow: Show ASCII Art Title "Employees Manager", 
 *          then ask how user wants to manage the Employees
 */
const asciiArtTitle = require("./views/asciiArtTitle.js");
asciiArtTitle.displayAsciiArtTitle();

const mainMenu = require("./views/cli/mainMenu");
mainMenu.inquirer();