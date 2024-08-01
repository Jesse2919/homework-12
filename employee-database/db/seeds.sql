INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Salesperson', 50000, 1),
('Software Engineer', 100000, 2),
('Accountant', 60000, 3),
('Lawyer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Mike', 'Johnson', 3, NULL),
('Emily', 'Davis', 4, NULL);
