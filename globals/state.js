/**
 * @file state.js
 * 
 * This is a global state object that became necessary because we're going between data access layer,
 * service layer, and subscribers multiple times for some features, like adding an employee. This would
 * decrease the need to pass up and down values.
 * 
 */

let state = {

}

module.exports = state;