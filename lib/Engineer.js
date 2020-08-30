// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
const inquirer = require("inquirer");

class Engineer extends Employee {
    constructor (name, id, email, github) {
        super(name, id, email);

        this.github = github;
    }

    getGithub () {
        return this.github;
    }

    getRole () {
        return "Engineer";
    }

    async askCustomInfo () {
        const question = {
            type: "input",
            name: "empGithub",
            message: "What is the employee's Github user name?",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "User name can not be empty.";
                } else {
                    return true;
                }
            }
        };

        const inq = await inquirer.prompt(question);
        this.github = inq.empGithub;
    }
}

module.exports = Engineer;
