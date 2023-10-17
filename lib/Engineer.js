// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");


class Engineer extends Employee{
    //Engineer "inherits" all the attributes of employee plus their own attributes(github).
    constructor(name, id, email, github){
        super(name, id, email)
        this.github = github;
    }
    //since the employee class extends, the getRole here would be originally the return "Employee" but it can be overwritten in the next class it extends to.
    getRole(){
        return "Engineer"
    }
    getGithub(){
        return this.github;
    }
}


module.exports = Engineer;