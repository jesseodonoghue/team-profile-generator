// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
const inquirer = require("inquirer");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);

        this.school = school;
    }

    getSchool () {
        return this.school;
    }

    getRole () {
        return "Intern";
    }

    async askCustomInfo () {
        const question = {
            type: "input",
            name: "empSchool",
            message: "What school did the employee go to?",
            validate: (value) => {
                if (value === "" || value === null) {
                    return "School can not be empty.";
                } else {
                    return true;
                }
            }
        };

        const inq = await inquirer.prompt(question);
        this.school = inq.empSchool;
    }
}

module.exports = Intern;