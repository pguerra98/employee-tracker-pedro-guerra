const inquirer = require("inquirer");

const mysql = require("mysql");

const cTable = require("console.table");

const database = require(".");

const connection = mysql.createConnection({

    host: "localhost", port: 3306, user: "root", password: "Bebelation99!@!951753", database: "employee_tracker_db"

});

connection.connect(function(err) {
    
    if (err) throw err;

    console.log("connected displayed as id " + connection.threadId);

    mainScreen();

});

function searchEmployees() {

    let meg = "SELECT * FROM employee";

    connection.query(meg, function(err, res) {

        if (err) throw err;

        console.table(res);

        mainScreen();

    });
}

function searchRoles() {

    let meg = "SELECT * FROM role";

    connection.query(meg, function(err,res) {

        if (err) throw err;

        console.table(res);

        mainScreen();
    });
}

function searchDepartment() {

    let meg = "SELECT * FROM department";

    connection.query(meg, function(err,res) {

        if (err) throw err;

        console.table(res);

        mainScreen();

    });
}

function mainScreen() {

    inquirer.prompt ({

        type: "list", 
        
        choices: [

            "Add a department", "Add an employee", "Add a role", "View roles", "View employees", "View departments", "Update the role of an employee", "Quit"
        ],

        message: "Please make a selection from the list provided.",

        name: "option"

        })

        .then(function(result) {

            console.log("Redirecting to " + result.option);

            switch(result.option) {

                case "Add a role":

                    addRole();

                    break;

                case "Add an employee":

                    addEmployee();

                    break;

                case "Add a department":

                    addDepartment();

                    break;

                case "View roles":

                    searchRoles();

                    break;

                case "View departments":

                    searchDepartment();

                    break;

                case "View employees":

                    searchEmployees();

                    break;

                case "Update the role of an employee":

                    updateEmployee();

                    break;

                default: quit();

            }

    });

}

function addDepartment() {

    inquirer.prompt({

        type: "input",
        
        message: "Please state the name of this department.",

        name: "departmentname"
    })

    .then(function(ans) {
        
        connection.query("INSERT INTO department (namedept) VALUES (?)", [ans.departmentname], function (err,res) {

            if (err) throw err;

            console.table(res)

            mainScreen()

        })
    })
}


function addEmployee() {

    inquirer.prompt([

    {

        type: "input",
        
        message: "Please state the first name of this employee.",

        name: "firstname"
    },
    
    {
        type: "input",

        message: "Please state the last name for this employee.",
        
        name: "lastname"

    },

    {

        type: "input",

        message: "Please provide the id of the role for this employee.",

        name: "employeeroleID"

    },

    {

        type: "input",

        message: "Please provide the id of the manager for this employee.",

        name: "employeemanager"

    }

])

    .then(function(ans) {
        
        connection.query("INSERT INTO employee (FirstName, LastName, rolespec, managerspec) VALUES (?, ?, ?, ?)", 

        [ans.firstname, ans.lastname, ans.employeeroleID, ans.employeemanager], function (err,res) {

            if (err) throw err;

            console.table(res)

            mainScreen()

        });
    });
}

function updateEmployee() {

    inquirer.prompt([

        {

            type:"input",

            message:"Please select the employee to update.",

            name:"update"

        },

        {

            type:"input",

            message:"Please select the role to update this employee",

            name:"roleupdated"

        }
    ])

    .then(function(ans) {

        connection.query('UPDATE employee SET role_id=? WHERE FirstName= ?', [ans.roleupdated, answer.update], 

        function (err,res) {

            if(err) throw err;

            console.table(res);

            mainScreen();

        });

    });

}

function addRole() {

    inquirer.prompt([

    {

        type: "input",
        
        message: "Please state the name of this role.",

        name: "rolename"
    },
    
    {
        type: "input",

        message: "Please state the yearly salary for this role.",
        
        name: "yearlysalary"

    },

    {

        type: "input",

        message: "Please provide the department ID number.",

        name: "departmentID"

    }

])

    .then(function(ans) {
        
        connection.query("INSERT INTO role (Title, compensation, departmentID) VALUES (?, ?, ?)", [ans.rolename, ans.yearlysalary, ans.departmentID], function (err,res) {

            if (err) throw err;

            console.table(res)

            mainScreen()

        });
    });
}

function quit() {

    connection.end();

    process.exit();
}