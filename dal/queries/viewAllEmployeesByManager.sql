-- Columns in the resulting records
SELECT E.id, E.first_name, E.last_name, R.title, 
D.name as department, R.salary,

-- Concatenate manager first and last name into a full name column
CONCAT(E_Self.first_name, " ", E_Self.last_name) AS manager

-- Start joining from Employees table
FROM employee as E

-- With Role table and have employee's role_id lookup role's id
INNER JOIN
role as R
ON E.role_id = R.id

-- And also join Department table, and have role's department_id lookup department's id
INNER JOIN
department as D
ON R.department_id = D.id

-- And finally, join employees table with another copy of employees table in order to change the manager_id to another employee name. Left join to have null values where there is no match at ON
LEFT JOIN
employee as E_Self
ON E.manager_id = E_Self.id

-- Sort the resulting records by id number
ORDER BY manager ASC