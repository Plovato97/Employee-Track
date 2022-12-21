const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeeTrack_db'
});

connection.connect((err) => {
    if (err) {
        console.error(`Error connecting to database: ${err.message}`);
        return;
    }
    console.log('Successfully connected to database.');
    main();
});

async function showMenu() {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ]
    });

    return answer.option;
}

async function main() {
    while (true) {
        const option = await showMenu();
        switch (option) {
            case 'View all departments':
                await viewDepartments();
                break;
            case 'View all roles':
                await viewRoles();
                break;
            case 'View all employees':
                await viewEmployees();
                break;
            case 'Add a department':
                await addDepartment();
                break;
            case 'Add a role':
                await addRole();
                break;
            case 'Add an employee':
                await addEmployee();
                break;
            case 'Update an employee role':
                await updateEmployeeRole();
                break;
            case 'Quit':
                return;
        }
    }
}

// Class for interacting with the database
class Database {
    constructor(connection) {
        this.connection = connection;
    }
}
//   Get all roles
function viewRoles() {
    // Check if the connection is closed
    if (connection.state === 'disconnected') {
        // Connect to the database
        connection.connect((err) => {
            if (err) {
                console.error(`Error connecting to database: ${err.message}`);
                return;
            }
            console.log('Successfully connected to database.');
        });
    }

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM role', (error, results) => {
            if (error) {
                console.error(`Error viewing roles: ${error.message}`);
                reject(error);
            } else {
                console.table(results);
                resolve(results);
            }
        });
    });
}

// Get all employees
async function viewEmployees() {
    // Check if the connection is closed
    if (connection.state === 'disconnected') {
        // Connect to the database
        connection.connect((err) => {
            if (err) {
                console.error(`Error connecting to database: ${err.message}`);
                return;
            }
            console.log('Successfully connected to database.');
        });
    }

    try {
        const [results] = await connection.query('SELECT * FROM employee');
        console.table(results);
    } catch (err) {
        console.error(`Error viewing employees: ${err.message}`);
    }
}

// view all departments
async function viewDepartments() {
    try {
      const [results] = await connection.query('SELECT * FROM department');
      console.table(results);
    } catch (err) {
      console.error(`Error viewing departments: ${err.message}`);
    }
  }
  

return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM department', (error, results) => {
        if (error) {
            console.error(`Error viewing departments: ${error.message}`);
            reject(error);
        } else {
            console.table(results);
            resolve(results);
        }
    });
});
//   add a department
async function addDepartment() {
    // Prompt the user for the department details
    const departmentDetails = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department:'
    });

    try {
        // Insert the department into the database
        const result = await connection.query('INSERT INTO department (name) VALUES (?)', [departmentDetails.name]);
        console.log(`Department with ID ${result.insertId} added successfully.`);
    } catch (err) {
        console.error(`Error adding department: ${err.message}`);
    }
}

// add a role
async function addRole() {
    // Prompt the user for the role details
    const roleDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the name of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the role:'
        },
        {
            name: 'department',
            type: 'list',
            message: 'What department is the new role for?',
            choices: [

                { name: 'Engineer', value: 1 },
                { name: 'Sales', value: 2 },
                { name: 'HR', value: 3 },
                { name: 'Legal', value: 4 },
                { name: 'Customer Service', value: 5 }

            ]
        }
    ]);

    // Add the role to the database
    try {
        await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [roleDetails.title, roleDetails.salary, roleDetails.department]);
        console.log('Role added successfully.');
    } catch (err) {
        console.error(`Error adding role: ${err.message}`);
    }
}
//  add an employee 
async function addEmployee() {
    // Prompt the user for the employee details
    const employeeDetails = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee:'
        },
        {
            name: 'role',
            type: 'list',
            message: 'What is the role of the employee?',
            choices: [
                { name: 'Engineer', value: 1 },
                { name: 'Sales', value: 2 },
                { name: 'HR', value: 3 },
                { name: 'Legal', value: 4 },
                { name: 'Customer Service', value: 5 }
            ]
        },
        {
            name: 'manager',
            type: 'list',
            message: 'Who is the manager of the employee?',
            choices: [
                { name: 'None', value: null },
                // Add choices for existing employees here
            ]
        }
    ]);

    // Add the employee to the database
    try {
        await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employeeDetails.firstName, employeeDetails.lastName, employeeDetails.role, employeeDetails.manager]);
        console.log('Employee added successfully.');
    } catch (err) {
        console.error(`Error adding employee: ${err.message}`);
    }
}

