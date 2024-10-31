CREATE DATABASE hms_db;
USE hms_db;

-- Get all customers from the users table
CREATE VIEW GetAllCustomers
AS
SELECT * FROM users WHERE role = "customer" AND deletedAt IS NULL;

SELECT * FROM GetAllCustomers;



