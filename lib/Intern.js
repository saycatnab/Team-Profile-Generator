// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
// "./Engineer" is not needed bc the Employee class is the blueprint for all the job roles. Engineer is its own job role.

class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email)
        this.school = school
    }
    getRole(){
        return "Intern";
    }
    getSchool(){
        return this.school;
    }
}

module.exports = Intern;