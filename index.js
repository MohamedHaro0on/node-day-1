import fs from "fs";
import path from "path";
import { Command } from "commander";
import Employee from "./Employee.js";
// get the current Directory :
const __dirname = process.cwd();

// create a new instance of the Command lib :
const program = new Command();

// get the absolute  path of the file :
const filePath = path.join(__dirname, "data.json");

// Parse the data in the file :
let employees = JSON.parse(fs.readFileSync(filePath));
employees = employees.map(
  ({ _name, _id, _yearsOfExperience, _level, _salary, _age, _email }) =>
    new Employee(_name, _age, _yearsOfExperience, _email, _salary, _level, _id)
);

// Define the "add" command
program
  .command("add")
  .description("Add a new employee")
  .option("--name <name>", "Employee name")
  .option("--age <age>", "Employee age")
  .option("--email <email>", "Employee email")
  .option("--salary <salary>", "Employee salary")
  .option("--level <level>", "Employee level")
  .option("--yearsOfExperience <years>", "Years of experience", "0")
  .action((options) => {
    try {
      // Validate required fields
      const requiredFields = ["name", "age", "email", "salary", "level"];
      for (const field of requiredFields) {
        if (!options[field]) {
          console.error(`Missing required field: ${field}`);
          return;
        }
      }

      // Assign a unique ID
      let id = employees[employees.length] + 1;

      // Create an Employee instance
      const newEmployee = new Employee(
        options.name,
        parseInt(options.age),
        parseInt(options.yearsOfExperience),
        options.email,
        parseFloat(options.salary),
        options.level,
        id
      );

      // Save employee
      employees.push(newEmployee);
      fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));

      console.log("Employee added successfully:", newEmployee);
    } catch (e) {
      console.error("Error adding employee:", e.message);
    }
  });
// define the List Command
program
  .command("list")
  .description("Listing all Employees")
  .option("--name <name>", "Employee name")
  .option("--age <age>", "Employee age")
  .option("--email <email>", "Employee email")
  .option("--salary <salary>", "Employee salary")
  .option("--level <level>", "Employee level")
  .option("--yearsOfExperience <years>", "Years of experience")
  .option("--id <id>", "Employee Id")
  .action((options) => {
    try {
      let filterCondition = {};
      let employeesString = ``;

      console.log("this is the options : ", options);
      Object.keys(options).map((key) => {
        filterCondition[key] = options[key];
      });
      console.log("this is the filter object : ", filterCondition);
      let filteredEmployees = employees.filter((employee) => {
        return Object.keys(filterCondition).every((key) => {
          return String(employee[key]) === String(filterCondition[key]);
        });
      });

      employeesString += filteredEmployees
        .map(
          ({ name, age, id, level, salary, email }) =>
            `id : ${id} | name : ${name} | age : ${age} | email : ${email} | level : ${level} | salary : ${salary} \n`
        )
        .join("");

      console.log(employeesString);
    } catch (e) {
      console.error("this is the error : ", e);
    }
  });

// Define the "delete" command
program
  .command("delete <id>")
  .description("delete Exisiting employee")
  .action((id) => {
    try {
      let newEmployees = employees.filter((em) => em.id !== JSON.parse(id));
      console.log("this is the newEmployees : ", newEmployees);
      fs.writeFileSync(filePath, JSON.stringify(newEmployees));
      console.log("Employee added successfully:", newEmployees);
    } catch (e) {
      console.error("Error adding employee:", e.message);
    }
  });

program
  .command("edit <id>")
  .description("Edit Exisiting employee")
  .option("--name <name>", "Employee name")
  .option("--age <age>", "Employee age")
  .option("--email <email>", "Employee email")
  .option("--salary <salary>", "Employee salary")
  .option("--level <level>", "Employee level")
  .option("--yearsOfExperience <years>", "Years of experience")
  .action((id, options) => {
    try {
      console.log("this is the id : ", id);
      let employee = employees.filter((em) => em.id === JSON.parse(id));
      if (employee) {
        console.log("this is the employee : ", employee);
        console.log("this is the options : ", options);
        Object.keys(options).map((key) => {
          employee[key] = options[key];
        });
        console.log("this is the edited employe : ", employee);
        fs.writeFileSync(filePath, JSON.stringify(employees));
        console.log("Employee edited successfully:");
      }
    } catch (e) {
      console.error("Error adding employee:", e.message);
    }
  });
// parsing the sent arguments :
program.parse(process.argv);
