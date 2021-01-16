require("dotenv").config();
const process = require("process");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql2 = require("mysql2");