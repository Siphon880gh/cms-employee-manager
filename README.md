CMS Employee Manager
====
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Description
---
By Weng Fei Fung. CMS Employee Manager is an internal tool for HR departments to manage employees, roles, and departments.

Screenshot
---
Watch [Youtube Demo](https://www.youtube.com/watch?v=skMjZjo3edM)

Table of Contents
---
- [Description](#description)
- [Screenshot](#screenshot)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Architecture](#architecture)
- [Tests](#tests)
- [Questions](#questions)

Installation
---
Clone repository, then run `npm install`.

Usage
---
Start tool in a terminal running `npm start`

License
---
[MIT License](https://opensource.org/licenses/MIT)

Architecture
---
For the architecture / design methodology, I used a Publisher-Subscriber pattern with Service and Data Access Layers. Inquirer helps with creating a command line interface for users to enter or select options. EventEmitter emits a custom event and the subscriber or event handler will call a service where all the business logic is stored (such as showing all employees or adding a new employee by the HR department). The service layer is not aware of any database implementations but it does wait for the Data Access Layer to return information if needed. This way, the service layer can be reused in future apps if you decide to move the app outside of a CLI environment to other technologies such as web apps. To keep the code error-free, Menu items that emit, the custom events, and the event handlers all share the same names by the way of constants.

Tests
---
npm test

Questions
---
- Where can I see more of your repositories?
	- Visit [Siphon880gh's Repositories](https://github.com/Siphon880gh)

- Where can I reach you?
	- You can reach me with additional questions at <a href='mailto:weffung@ucdavis.edu'>weffung@ucdavis.edu</a>.
	- Want to [hire me](https://www.linkedin.com/in/weng-fung/)?