const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3300,
    user: 'user',
    password: 'password',
    database: 'employeeTrack_db'
  });

  connection.connect((err) => {
    if (err) {
      console.error(`Error connecting to database: ${err.message}`);
      return;
    }
    console.log('Successfully connected to database.');
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
  
  
  async function viewDepartments() {
    try {
      const [results] = await connection.query('SELECT * FROM department');
      console.table(results);
    } catch (err) {
      console.error(`Error viewing departments: ${err.message}`);
    }
  }
  main();
  