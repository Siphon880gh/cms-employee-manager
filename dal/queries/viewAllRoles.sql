SELECT role.id, role.title as role, department.name as department, role.salary 
FROM role
INNER JOIN department
ON role.department_id = department.id
ORDER BY role.id