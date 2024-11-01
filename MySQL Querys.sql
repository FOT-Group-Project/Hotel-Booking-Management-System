CREATE DATABASE hms_db;
USE hms_db;

-- Get all customers from the users table
CREATE VIEW GetAllCustomers
AS
SELECT * FROM users WHERE role = "customer" AND deletedAt IS NULL;

SELECT * FROM GetAllCustomers;


-- Create a stored procedure to create a new room category
DELIMITER //
CREATE PROCEDURE CreateRoomCategory(
    IN p_category_name VARCHAR(255),
    IN p_price DECIMAL(10, 2),
    IN p_description TEXT,
    IN p_room_image VARCHAR(255)
)
BEGIN
    DECLARE category_exists INT;

    -- Check if the category already exists
    SELECT COUNT(*)
    INTO category_exists
    FROM roomcategories
    WHERE category_name = p_category_name AND deletedAt IS NULL;

    IF category_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Category already exists';
    ELSE
        INSERT INTO roomcategories (category_name, price, description, image, createdAt, updatedAt)
        VALUES (p_category_name, p_price, p_description, p_room_image, NOW(), NOW());
    END IF;
END //
DELIMITER ;

-- Create a stored procedure to update a room category
DELIMITER //
CREATE PROCEDURE UpdateRoomCategory(
    IN p_id INT,
    IN p_category_name VARCHAR(255),
    IN p_price DECIMAL(10, 2),
    IN p_description TEXT,
    IN p_room_image VARCHAR(255)
)
BEGIN
    DECLARE room_exists INT;
    SELECT COUNT(*) INTO room_exists FROM roomcategories WHERE id = p_id;

    IF room_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Room category not found';
    ELSE
        UPDATE roomcategories
        SET category_name = p_category_name,
            price = p_price,
            description = p_description,
            image = p_room_image,
            updatedAt = NOW()
        WHERE id = p_id;
    END IF;
END //
DELIMITER ;


-- Create a stored procedure to soft delete a room category
DELIMITER //
CREATE PROCEDURE SoftDeleteRoomCategory(IN p_id INT)
BEGIN
    DECLARE room_exists INT;

    -- Check if the room category exists and is not already soft deleted
    SELECT COUNT(*) INTO room_exists 
    FROM roomcategories 
    WHERE id = p_id AND deletedAt IS NULL;

    IF room_exists = 0 THEN
        -- Signal an error if no matching room category is found or it's already soft deleted
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Room category not found or already deleted';
    ELSE
        -- Perform soft delete by updating deleted_at timestamp
        UPDATE roomcategories 
        SET deletedAt = NOW(), updatedAt = NOW()
        WHERE id = p_id;
    END IF;
END //
DELIMITER ;

-- Create a stored procedure to get all room categories
DELIMITER //
CREATE PROCEDURE GetRoomCategories()
BEGIN
    SELECT id, category_name, price, description, image, createdAt, updatedAt
    FROM roomcategories
    WHERE deletedAt IS NULL;
END //
DELIMITER ;
