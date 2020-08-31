const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { type } = require("os");



const team = []; // empty array for team members

const inqManager = [
    {
        type: "input",
        name: "manName",
        message: "What is the manager's name?",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Name can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "manId",
        message: "What is the manager's ID?",
        validate: (value) => {
            if (value === "" || value === null) {
                return "ID can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "manEmail",
        message: "What is the manager's email?",
        validate:   (value) => {

            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)

            if (value === "" || value === null) {
                return "Email can not be empty.";
            } else if (valid) {
                return true;
            } else {
                return "Please enter a valid email."
            }
        }
    },
    {
        type: "input",
        name: "manPhone",
        message: "What is the manager's office phone number?",
        validate: (value) => {

            const valid = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(value);

            if (value === "" || value === null) {
                return "Phone number can not be empty.";                
            } else if (valid) {
                return true;
            } else {
                return "Please enter a valid phone number."
            }
        }
    },
]; // Array of questions for a manager

const inqTeam = [
    {
        type: "list",
        name: "empRole",
        message: "What is the employee's role?",
        choices: ["Engineer", "Intern"]
    },
    {
        type: "input",
        name: "empName",
        message: "What is the employee's name?",
        validate: (value) => {
            if (value === "" || value === null) {
                return "Name can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "empId",
        message: "What is the employee's ID?",
        validate: (value) => {
            if (value === "" || value === null) {
                return "ID can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "empEmail",
        message: "What is the employee's email?",
        validate:   (value) => {

            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)

            if (value === "" || value === null) {
                return "Email can not be empty.";
            } else if (valid) {
                return true;
            } else {
                return "Please enter a valid email."
            }
        }
    }
]; // Array of questions for an employee


createEmployee = (name, id, email, role) => {

    switch(role) {
        case "Engineer":
            return new Engineer(name, id, email, "");
            break;
        case "Intern":
            return new Intern(name, id, email, "");
            break;
    }

} // Function to create a new instance of an employee type

writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            return console.log(err);
        } 

        console.log("HTML file successfully generated!!");
    });
} // Function to write a file to disk

init = async () => {

    let moreEmp = true; // flag to track if there are more employees to enter

    console.log(`
    Let's build a team of engineers! Start with a manager:    
    `);
    
    await inquirer.prompt(inqManager).then((answers) => {
        const manager = new Manager(answers.manName, answers.manId, answers.manEmail, answers.manPhone);
        team.push(manager);
    });

    console.log(`
    
    Now let's add more members to the team:
    
    `);

    while (moreEmp) {

        await inquirer.prompt(inqTeam).then(async (answers) => {
            let employee = createEmployee(answers.empName, answers.empId, answers.empEmail, answers.empRole);
            await employee.askCustomInfo();
            team.push(employee);
        });

        
        await inquirer.prompt([
            {
                type: "confirm",
                name: "empMore",
                message: "Would you like to add more employees to the team?"
            }
        ]).then((answers) => {
            moreEmp = answers.empMore;
        });

    }

    const output = render(team);
    writeToFile(outputPath, output);

} // Main program function


init(); // Execute main program function