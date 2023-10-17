const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = []
const idList = []

const  appMenu = () => {
    function createManager(){
        console.log("Please build you team!");
        inquirer.prompt([
            {
                type: "input",
                name: 'managerName',
                message: "What is the team manager's name?",
                validate: answer => {
                    if(answer != ""){
                        return true
                    }
                    return "Please enter at least one character."
                }
            },
            {
                type: "input",
                name: "managerID",
                message: "What is the team manager's id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the team manager's office number?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number"
            },
        ]).then(answer => {
            const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOfficeNumber)
            teamMembers.push(manager);
            idList.push(answer.managerId);
            createTeam();
        })
    }

    createManager();
}


appMenu()