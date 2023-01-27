const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

let employees = []; 

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// Questions for the managers name, id, email and office number
const managerQuestions = [
    {
        // Enter the team managers name
        type: 'input',
        message: 'Enter the team managers name',
        name: 'managerName',
      },
      {
        // Enter the managers ID
        type: 'input',
        message: 'Enter the team managers ID',
        name: 'managerId',
      },
      {
        // Enter the managers email
        type: 'input',
        message: 'Enter the team managers email',
        name: 'managerEmail',
      },
      {
        // Enter the office number
        type: 'input',
        message: 'Enter the Office Number',
        name: 'officeNumber',
      },
]

// Select one of three options: Add an engineer, add an intern, finish building the team
const pivotQuestion = {
    type: 'list',
    message: 'Please select one of the following options',
    name: 'options',
    choices: ["Add an Engineer", "Add an Intern", "Finish Building the Team"]
}

// Questions for the interns name, id, email and school
const internQuestions = [
    {
        // Enter the interns name
        type: 'input',
        message: 'Enter the interns name',
        name: 'internName',
      },
      {
        // Enter the interns ID
        type: 'input',
        message: 'Enter the interns ID',
        name: 'internId',
      },
      {
        // Enter the interns email
        type: 'input',
        message: 'Enter the interns email',
        name: 'internEmail',
      },
      {
        // Enter the interns school
        type: 'input',
        message: 'Enter the interns school',
        name: 'school',
      },
]

// Questions for the engineers name, id, email and github username
const engineerQuestions = [
    {
        // Enter the engineers name
        type: 'input',
        message: 'Enter the engineers name',
        name: 'engineerName',
      },
      {
        // Enter the engineers ID
        type: 'input',
        message: 'Enter the engineers ID',
        name: 'engineerId',
      },
      {
        // Enter the engineers email
        type: 'input',
        message: 'Enter the engineers email',
        name: 'engineerEmail',
      },
      {
        // Enter the engineers github
        type: 'input',
        message: 'Enter the engineers github',
        name: 'github',
      },
]


// Function to pass the intern responses to the intern object constructor
function getInternInfo(){
inquirer
    .prompt(internQuestions).then((responseIntern) => {
        console.log(responseIntern);
        
       employees.push(new Intern(
            responseIntern.internName, 
            responseIntern.internId, 
            responseIntern.internEmail, 
            responseIntern.school
            ));
            addEmployees()
    })  
}

// Function to pass the engineer responses to the engineer object constructor
function getEngineerInfo(){
inquirer
    .prompt(engineerQuestions).then((responseEngineer) => {
        console.log(responseEngineer);
        // Construct new engineer object and push to employees array
        employees.push(new Engineer(
            responseEngineer.engineerName, 
            responseEngineer.engineerId, 
            responseEngineer.engineerEmail, 
            responseEngineer.github
            ));
            addEmployees()
    }) 
}    

// Function to pass the manager responses to the manager object constructor and call the addEmployees function
function addInfo(){
inquirer
    .prompt(managerQuestions).then((responseManager) => {
        console.log(responseManager);
        // Construct new manager object and push to employees array
        employees.push(new Manager(
            responseManager.managerName, 
            responseManager.managerId, 
            responseManager.managerEmail, 
            responseManager.officeNumber
            ));
        addEmployees()
    })
}

// Function to call the intern, 
function addEmployees() {
    return inquirer.prompt(pivotQuestion).then((response) => {
        console.log(response);
        
        if(response.options === "Add an Intern") {
        // If add an intern is selected, call the function which prompts the intern questions.
            getInternInfo()
        }
        else if (response.options === "Add an Engineer"){
        // If add an engineer is selected, call the function which prompts the engineer questions.
            getEngineerInfo()
        }
        else {
            // If finish building team selected, generate HTML
            console.log('All Done!')
            // console.log(employees);
            // console.log(render(employees));
            fs.writeFile(outputPath,render(employees),(err) => err ? console.log("err") : console.log("success"))
        }
    })
}



addInfo()

