const inquirer = require('inquirer');
const {
    getDepartments,
    getRoles,
    getEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
} = require('./utils/queries');

const startApp = async () => {
    const answer = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit',
        ],
    });

    switch (answer.action) {
        case 'View all departments':
            const departments = await getDepartments();
            console.table(departments);
            break;

        case 'View all roles':
            const roles = await getRoles();
            console.table(roles);
            break;

        case 'View all employees':
            const employees = await getEmployees();
            console.table(employees);
            break;

        case 'Add a department':
            const { name } = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:',
            });
            await addDepartment(name);
            console.log(`Added department: ${name}`);
            break;

        case 'Add a role':
            const departmentsForRole = await getDepartments();
            const roleAnswers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the title of the role:',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'Enter the salary for the role:',
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select the department for the role:',
                    choices: departmentsForRole.map((department) => ({
                        name: department.name,
                        value: department.id,
                    })),
                },
            ]);
            await addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.department_id);
            console.log(`Added role: ${roleAnswers.title}`);
            break;

        case 'Add an employee':
            const rolesForEmployee = await getRoles();
            const employeesForManager = await getEmployees();
            const employeeAnswers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'Enter the first name of the employee:',
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'Enter the last name of the employee:',
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the role for the employee:',
                    choices: rolesForEmployee.map((role) => ({
                        name: role.title,
                        value: role.id,
                    })),
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select the manager for the employee:',
                    choices: [{ name: 'None', value: null }].concat(
                        employeesForManager.map((employee) => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id,
                        }))
                    ),
                },
            ]);
            await addEmployee(
                employeeAnswers.first_name,
                employeeAnswers.last_name,
                employeeAnswers.role_id,
                employeeAnswers.manager_id
            );
            console.log(`Added employee: ${employeeAnswers.first_name} ${employeeAnswers.last_name}`);
            break;

        case 'Update an employee role':
            const employeesForUpdate = await getEmployees();
            const rolesForUpdate = await getRoles();
            const updateAnswers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select the employee to update:',
                    choices: employeesForUpdate.map((employee) => ({
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id,
                    })),
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the new role for the employee:',
                    choices: rolesForUpdate.map((role) => ({
                        name: role.title,
                        value: role.id,
                    })),
                },
            ]);
            await updateEmployeeRole(updateAnswers.employee_id, updateAnswers.role_id);
            console.log('Employee role updated');
            break;

        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    startApp();
};

startApp();

