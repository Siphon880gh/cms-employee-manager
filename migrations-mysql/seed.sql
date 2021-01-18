
INSERT INTO `employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES
(1, 'John', 'Doe', 5, 3),
(2, 'Mike', 'Chan', 6, 1),
(3, 'Ashley', 'Rodriguez', 2, NULL),
(4, 'Kevin', 'Tupik', 7, 3),
(5, 'Malia', 'Brown', 1, NULL),
(6, 'Sarah', 'Lourd', 3, NULL),
(7, 'Tom', 'Allen', 4, 6),
(8, 'Tamer', 'Galal', 7, 5);

INSERT INTO `role` (`id`, `title`, `salary`, `department_id`) VALUES
(1, 'Accountant', '125000', 2),
(2, 'Lead Engineer', '150000', 1),
(3, 'Legal Team Lead', '250000', 3),
(4, 'Lawyer', '190000', 3),
(5, 'Sales Lead', '100000', 4),
(6, 'Salesperson', '80000', 4),
(7, 'Software Engineer', '120000', 1);

INSERT INTO `department` (`id`, `name`) VALUES
(1, 'Engineering'),
(2, 'Finance'),
(3, 'Legal'),
(4, 'Sales');