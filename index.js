const mysql = require('mysql2');
const inquirer = require('inquirer');

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

class Database {
    constructor(connection) {
      this.connection = connection;
    }
  
    async getDepartments() {
      try {
        const [results] = await this.connection.query('SELECT * FROM department');
        return results;
      } catch (err) {
        console.error(`Error executing query: ${err.message}`);
        return null;
      }
    }
  }
  
  const database = new Database(connection);
  const departments = await database.getDepartments();
  console.log(departments);
  

  const departmentName = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:'
  });
  
  try {
    await this.connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
    console.log('Department added successfully.');
  } catch (err) {
    console.error(`Error adding department: ${err.message}`);
  }