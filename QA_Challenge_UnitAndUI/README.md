# Junior QA Engineer Challenge

Welcome to RivalTech's QA Engineer Challenge.
Please read through the entire README.md file once before getting started.

Before starting, we recommend that you run the application in the browser and get familiar with its behaviour and functionality:
ensure you have the latest Node.js LTS version installed
first unzip the project
open a terminal(Mac) or command prompt(Windows) window
then run: npm install
then run: npm start
then navigate to http://localhost:3000 in you web browser

Challenge 1:
React and Redux are commonly used for frontend development. A typical React application consists of a collection of React components. React components are similar to functions.

a. Take a look at the code for Todo component in Todo.js located inside the components folder.
Using pseudo code in plain english, add a few test cases to Todo.test.js file.
There is a sample test provided to help you get started.
If you have prior experience or knowledge with React, feel free to skip the pseudo code and write the actual code for these tests in the same file. But this portion is optional.

Redux is used as a state management tool in frontend javascript applications. Reducers are pure functions and they take in certain inputs and produce certain output.

b. Take a look at the code for todos reducer in todos.js located inside the reducers folder.
Using pseudo code in plain english, add a few test cases to todos.test.js file.
There is a sample test provided to help you get started.
If you have prior experience or knowledge with Redux and reducers, feel free to skip the pseudo code and write the actual code for these tests in the same file. But this portion is optional.

Challenge 2:
Cypress is a framework that is used for UI testing. You can find more information on the official page below:
https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell

Write UI Tests using the Cypress framework that verify the correct functionality of the application.
You don't need to install Cypress. It has already been setup for you.
You can place your tests inside the cypress > integration > ui.spec.js file.
There is a sample test provided to help you get started.
Once you are done, you can run your tests using the following commands:
npm run cy:open

Before running your UI tests, ensure that the application is running locally by using the following commands:
npm i
npm start

Please try and attempt all of the challenges. If you don't manage to finish, that is fine. Please send us what you were able to get done.

Once you finish the challenges, delete the folder called "node_modules", zip the project directory, include your name in the zip file, place it on your Google Drive or One Drive and send us back the download link.

Good luck!

## Installation and Setup

Ensure you have the latest Node.js LTS version installed on your machine:
https://nodejs.org/en/download/

### `npm install`

Installs all of the required dependencies. You will need to run this command before starting anything else.

### `npm start`

Runs the app in the development mode.<br>
Open http://localhost:3000 to view it in the browser.

The page will reload if you make changes to the source code<br>
