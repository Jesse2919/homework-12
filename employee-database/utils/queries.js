const client = require('../db/connection');

// Get all departments
const getDepartments = async () => {
    const res = await client.query('SELECT * FROM department');
    return res.rows;
};

// Get all roles
const getRoles = async () => {
    const res = await client.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
    return res.rows;
};

// Get all employees
const getEmployees = async () => {
    const res = await client.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id');
    return res.rows;
};

// Add a new department
const addDepartment = async (name) => {
    const res = await client.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return res.rows[0];
};

// Add a new role
const addRole = async (title, salary, department_id) => {
    const res = await client.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, department_id]);
    return res.rows[0];
};

// Add a new employee
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    const res = await client.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [first_name, last_name, role_id, manager_id]);
    return res.rows[0];
};

// Update an employee's role
const updateEmployeeRole = async (employee_id, role_id) => {
    const res = await client.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *', [role_id, employee_id]);
    return res.rows[0];
};

module.exports = {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
};
