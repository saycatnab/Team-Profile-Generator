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
    function buildTeam(){
        if(!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), 'utf-8');
    }

    function addEngineer(){
        inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer name?"
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer Id?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer email?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer GitHub?"
        },
        ]).then(answer => {
            const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGithub)
            teamMembers.push(engineer);
            idList.push(answer.engineerId);
            // console.log(engineer)
            createTeam()
        })
    }

    function addIntern(){
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern name?"
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern Id?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern email?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern school?"
            },
            ]).then(answer => {
                const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internSchool)
                teamMembers.push(intern);
                idList.push(answer.internId);
                // console.log(intern)
                createTeam()
            })
    }
    function createTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I dont want to add any more team members"
                ]
            },
        ]).then(userChoice => {

        if (userChoice.memberChoice === "Engineer"){
            //Add engineer
            addEngineer()
        } else if(userChoice.memberChoice === "Intern"){
            //Add intern
            addIntern()
        } else {
            //build team function
            buildTeam()
        }
        })
    }


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
                message: "What is the team manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the team manager's office number"
            },
        ]).then(answer => {
            const manager = new Manager(answer.managerName, answer.managerID, answer.managerEmail, answer.managerOfficeNumber)
            // console.log(manager);
            teamMembers.push(manager);
            idList.push(answer.managerId);
            createTeam();
        })
    }

    createManager();
}


appMenu()