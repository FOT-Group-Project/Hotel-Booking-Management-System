CREATE DATABASE IF NOT EXISTS SalfordDB;
USE SalfordDB;
#run this file before start the project
#sql
ALTER TABLE Rooms
ADD CONSTRAINT fk_rooms_category_id
FOREIGN KEY (category_id) REFERENCES RoomCategories(id);

ALTER TABLE Bookings
ADD CONSTRAINT fk_bookings_room_id
FOREIGN KEY (room_id) REFERENCES Rooms(id);

ALTER TABLE Bookings
ADD CONSTRAINT fk_bookings_customer_id
FOREIGN KEY (customer_id) REFERENCES Customers(id);

ALTER TABLE Payments
ADD CONSTRAINT fk_payments_booking_id
FOREIGN KEY (booking_id) REFERENCES Bookings(id);

ALTER TABLE Feedbacks
ADD CONSTRAINT fk_feedbacks_booking_id
FOREIGN KEY (booking_id) REFERENCES Bookings(id);

ALTER TABLE Checkings
ADD CONSTRAINT fk_booking_id
FOREIGN KEY (booking_id) REFERENCES Bookings(id);

ALTER TABLE AuditLogs
ADD CONSTRAINT fk_room_id
FOREIGN KEY (room_id) REFERENCES Rooms(id);


CREATE UNIQUE INDEX idx_customer_email ON Customers(email);
CREATE UNIQUE INDEX idx_user_email ON Users(email); -- Assuming 'users' table exists and needs capitalization
CREATE UNIQUE INDEX idx_room_name ON Rooms(room_name);
CREATE INDEX idx_roomId_customerId_checkInDate ON Bookings(room_id, customer_id, date_in);

-- Calculate the total revenue based on the total price for all checked-in bookings
DELIMITER $$
CREATE FUNCTION GetTotalRevenue()
RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
    DECLARE total_revenue DECIMAL(10, 2);

    -- Calculate total revenue for all checked-in bookings using CalculateTotalPrice
    SELECT COALESCE(SUM(CalculateTotalPrice(b.room_id, b.date_in, b.date_out)), 0) INTO total_revenue
    FROM Bookings b
    WHERE b.status = 'checked_out';

    RETURN total_revenue;
END$$
DELIMITER ;

-- Calculate the monthly revenue
DELIMITER $$
CREATE FUNCTION GetMonthlyRevenue()
RETURNS DECIMAL(10, 2)
DETERMINISTIC
BEGIN
    DECLARE monthly_revenue DECIMAL(10, 2);

    -- Calculate total revenue for the current month using CalculateTotalPrice
    SELECT COALESCE(SUM(CalculateTotalPrice(b.room_id, b.date_in, b.date_out)), 0) INTO monthly_revenue
    FROM Bookings b
    WHERE MONTH(b.date_out) = MONTH(CURRENT_DATE)
      AND YEAR(b.date_out) = YEAR(CURRENT_DATE)
      AND b.status = 'checked_out';

    RETURN monthly_revenue;
END$$
DELIMITER ;

-- Calculate the total rooms
DELIMITER $$
CREATE FUNCTION GetTotalRooms()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total_rooms INT;

    -- Calculate total rooms
    SELECT COUNT(*) INTO total_rooms
    FROM Rooms;

    RETURN total_rooms;
END$$
DELIMITER ;

-- Calculate the total available rooms
DELIMITER $$
CREATE FUNCTION GetAvailableRooms()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE available_rooms INT;

    -- Calculate total available rooms (assuming availability is marked as 1 for available)
    SELECT COUNT(*) INTO available_rooms
    FROM Rooms
    WHERE status = "available"; -- Modify this condition based on your schema

    RETURN available_rooms;
END$$
DELIMITER ;

-- Calculate the total customers
DELIMITER $$
CREATE FUNCTION GetTotalCustomers()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total_customers INT;

    -- Count distinct customers based on unique entries in the 'Customers' table
    SELECT COUNT(DISTINCT id) INTO total_customers
    FROM Customers
    WHERE Customers.deletedAt IS NULL;

    RETURN total_customers;
END$$
DELIMITER ;

DELIMITER $$
CREATE FUNCTION GetActiveCustomers()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE active_customers INT;

    -- Count distinct customers with more than one booking
    SELECT COUNT(*)
    INTO active_customers
    FROM (
        SELECT customer_id
        FROM Bookings
        GROUP BY customer_id
        HAVING COUNT(*) > 3
    ) AS active;

    RETURN active_customers;
END$$
DELIMITER ;

-- Function to Count Check-Ins
DELIMITER $$
CREATE FUNCTION GetTotalCheckIns()
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE total_checkins INT;

    -- Count total check-ins based on the status 'Checked-in'
    SELECT COUNT(*) INTO total_checkins
    FROM Bookings
    WHERE status = 'Checked_in';

    RETURN total_checkins;
END$$
DELIMITER ;

-- Create a stored procedure to get all revenue and statistics
DELIMITER $$
CREATE PROCEDURE GetAllRevenueAndStatistics()
BEGIN
    DECLARE total_revenue DECIMAL(10, 2);
    DECLARE monthly_revenue DECIMAL(10, 2);
    DECLARE total_rooms INT;
    DECLARE available_rooms INT;
    DECLARE total_customers INT;
    DECLARE active_customers INT;
    DECLARE total_chcek_in INT;

    -- Call the functions to get the required values
    SET total_revenue = GetTotalRevenue();
    SET monthly_revenue = GetMonthlyRevenue();
    SET total_rooms = GetTotalRooms();
    SET available_rooms = GetAvailableRooms();
    SET total_customers = GetTotalCustomers();
    SET active_customers = GetActiveCustomers();
    SET total_chcek_in = GetTotalCheckIns();

    -- Return the results as a single result set
    SELECT
        total_revenue AS Total_Revenue,
        monthly_revenue AS Monthly_Revenue,
        total_rooms AS Total_Rooms,
        available_rooms AS Available_Rooms,
        total_customers AS Total_Customers,
        active_customers AS Active_Customers,
        total_chcek_in AS Total_Chcek_In;
END$$
DELIMITER ;

DELIMITER //
CREATE FUNCTION CalculateTotalPrice(roomId INT, dateIn DATETIME, dateOut DATETIME)
RETURNS DOUBLE
DETERMINISTIC
BEGIN
    DECLARE total_price DOUBLE;
    DECLARE days_booked INT;
    DECLARE room_price DOUBLE;

    -- Calculate the number of days between date_in and date_out
    SET days_booked = DATEDIFF(dateOut, dateIn);

    -- Ensure days_booked is at least 1
    IF days_booked = 0 THEN
        SET days_booked = 1;
    END IF;

    -- Get the price for the specified room's category
    SELECT rc.price INTO room_price
    FROM Rooms r
    JOIN RoomCategories rc ON r.category_id = rc.id
    WHERE r.id = roomId;

    -- Calculate the total price
    SET total_price = room_price * days_booked;

    RETURN total_price;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION CalculateDaysBooked(dateIn DATETIME, dateOut DATETIME)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE days_booked INT;

    -- Calculate the number of days between date_in and date_out
    SET days_booked = DATEDIFF(dateOut, dateIn);

    -- Ensure days_booked is at least 1
    IF days_booked = 0 THEN
        SET days_booked = 1;
    END IF;

    RETURN days_booked;
END //
DELIMITER ;

-- Room Categories Table Stored Procedures
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
    FROM RoomCategories
    WHERE category_name = p_category_name AND deletedAt IS NULL;

    IF category_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Category already exists';
    ELSE
        INSERT INTO RoomCategories (category_name, price, description, image, createdAt, updatedAt)
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
    SELECT COUNT(*) INTO room_exists FROM RoomCategories WHERE id = p_id;

    IF room_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Room category not found';
    ELSE
        UPDATE RoomCategories
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
    FROM RoomCategories
    WHERE id = p_id AND deletedAt IS NULL;

    IF room_exists = 0 THEN
        -- Signal an error if no matching room category is found or it's already soft deleted
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Room category not found or already deleted';
    ELSE
        -- Perform soft delete by updating deleted_at timestamp
        UPDATE RoomCategories
        SET deletedAt = NOW(), updatedAt = NOW()
        WHERE id = p_id;
    END IF;
END //
DELIMITER ;

-- Create a View retrieve room categories
CREATE VIEW GetRoomCategories
AS
SELECT id, category_name, price, description, image, createdAt, updatedAt
FROM RoomCategories
WHERE deletedAt IS NULL;

-- Rooms Table Stored Procedures and Views
-- Create a view to create get room details
CREATE VIEW GetRooms
AS
SELECT * FROM Rooms WHERE deletedAt IS NULL;

-- Create a stored procedure to create a new room
DELIMITER //
CREATE PROCEDURE CreateRoom(
    IN p_room_name VARCHAR(255),
    IN p_category_id INT,
    IN p_status VARCHAR(255)
)
BEGIN
    IF (SELECT COUNT(*) FROM Rooms WHERE room_name = p_room_name AND deletedAt IS NULL) > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Room already exists';
    ELSE
        INSERT INTO Rooms (room_name, category_id, status, createdAt, updatedAt)
        VALUES (p_room_name, p_category_id, p_status, NOW(), NOW());
    END IF;
END //
DELIMITER ;

-- Create a stored procedure to update a room
DELIMITER //
CREATE PROCEDURE UpdateRoom(
    IN p_id INT,
    IN p_room_name VARCHAR(255),
    IN p_category_id INT,
    IN p_status VARCHAR(255)
)
BEGIN
    IF (SELECT COUNT(*) FROM Rooms WHERE id = p_id) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Room not found';
    ELSE
        UPDATE Rooms
        SET room_name = p_room_name,
            category_id = p_category_id,
            status = p_status,
            updatedAt = NOW()
        WHERE id = p_id;
    END IF;
END //
DELIMITER ;

-- Create a stored procedure to soft delete a room
DELIMITER //
CREATE PROCEDURE DeleteRoom(IN p_id INT)
BEGIN
    IF (SELECT COUNT(*) FROM Rooms WHERE id = p_id) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Room not found';
    ELSE
        UPDATE Rooms SET deletedAt = NOW() WHERE id = p_id;
    END IF;
END //
DELIMITER ;

-- Get room all details combined with room category using VIEW
CREATE VIEW RoomDetails
AS
SELECT r.id, r.room_name, r.status, r.createdAt, r.updatedAt, rc.category_name, rc.price, rc.description, rc.image
FROM Rooms r
JOIN RoomCategories rc ON r.category_id = rc.id
WHERE r.deletedAt IS NULL;

-- Create Procedure (Add a New Customer)
DELIMITER //
CREATE PROCEDURE CreateCustomer (
    IN `p_name` TEXT,
    IN `p_contact_no` VARCHAR(255),
    IN `p_email` VARCHAR(255)
)
BEGIN
    IF EXISTS (SELECT 1 FROM `Customers` WHERE `email` = p_email AND `deletedAt` IS NULL) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Email already exists';

    ELSEIF EXISTS (SELECT 1 FROM `Customers` WHERE `contact_no` = p_contact_no AND `deletedAt` IS NULL) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Contact number already exists';
    ELSE
        INSERT INTO `Customers` (`name`, `contact_no`, `email`, `createdAt`, `updatedAt`)
        VALUES (p_name, p_contact_no, p_email, NOW(), NOW());
    END IF;
END //
DELIMITER ;

-- Update Procedure (Update an Existing Customer)
DELIMITER //
CREATE PROCEDURE UpdateCustomer (
    IN `p_id` INT,
    IN `p_name` TEXT,
    IN `p_contact_no` VARCHAR(255),
    IN `p_email` VARCHAR(255)
)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM `Customers` WHERE `id` = p_id AND `deletedAt` IS NULL) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Customer not found';
    END IF;

    IF EXISTS (SELECT 1 FROM `Customers` WHERE `email` = p_email AND `id` != p_id AND `deletedAt` IS NULL) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Email already exists';

    ELSEIF EXISTS (SELECT 1 FROM `Customers` WHERE `contact_no` = p_contact_no AND `id` != p_id AND `deletedAt` IS NULL) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Contact number already exists';
    ELSE
        UPDATE `Customers`
        SET `name` = p_name, `contact_no` = p_contact_no, `email` = p_email, `updatedAt` = NOW()
        WHERE `id` = p_id;
    END IF;
END //
DELIMITER ;

-- Delete Procedure (Delete an Existing Customer)
DELIMITER //
CREATE PROCEDURE DeleteCustomer (
    IN `p_id` INT
)
BEGIN
    IF EXISTS (SELECT 1 FROM `Customers` WHERE `id` = p_id AND `deletedAt` IS NOT NULL) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Customer already deleted';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM `Customers` WHERE `id` = p_id AND `deletedAt` IS NULL) THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Customer not found';
    ELSE
        UPDATE `Customers`
        SET `deletedAt` = NOW()
        WHERE `id` = p_id;
    END IF;
END //
DELIMITER ;

-- Retrieve View (Get All Customers)
CREATE VIEW GetCustomers
AS
SELECT `id`, `name`, `contact_no`, `email`, `createdAt`, `updatedAt`
FROM `Customers`
WHERE `deletedAt` IS NULL;

-- Create a stored procedure to create a new booking
DELIMITER $$
CREATE PROCEDURE `CreateBooking` (
    IN p_room_id INT,
    IN p_customer_id INT,
    IN p_date_in DATETIME,
    IN p_date_out DATETIME
)
BEGIN
    DECLARE v_room_status ENUM('available', 'occupied', 'maintenance');
    DECLARE v_error_message VARCHAR(255);
    DECLARE v_reference_number VARCHAR(255);

    -- Declare a handler to rollback if an error occurs
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Get the diagnostics for the error
        GET DIAGNOSTICS CONDITION 1 v_error_message = MESSAGE_TEXT;

        -- Rollback the transaction
        ROLLBACK;

        -- Raise an SQL exception with the error message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_message;
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Generate a unique reference number based on date-time and a random number
    SET v_reference_number = CONCAT(
        DATE_FORMAT(NOW(), '%Y%m%d%H'), '-',   -- Format current timestamp as YYYYMMDDHHMMSS
        LPAD(FLOOR(RAND() * 10000), 4, '0')        -- Generate a random 4-digit number
    );
    -- Check if the room is available
    SELECT `status` INTO v_room_status
    FROM `Rooms`
    WHERE `id` = p_room_id AND `deletedAt` IS NULL
    FOR UPDATE;

    IF v_room_status != 'available' THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Room is not available for booking.';
    ELSE
        -- Insert the booking
        INSERT INTO `Bookings` (
            `reference_number`, `room_id`, `customer_id`, `date_in`, `date_out`, `status`, `createdAt`, `updatedAt`
        ) VALUES (
            v_reference_number, p_room_id, p_customer_id, p_date_in, p_date_out, 'pending', NOW(), NOW()
        );

        -- Update the room status to occupied
        UPDATE `Rooms`
        SET `status` = 'occupied', `updatedAt` = NOW()
        WHERE `id` = p_room_id AND `deletedAt` IS NULL;
    END IF;

    -- Commit the transaction if all operations succeed
    COMMIT;
END$$
DELIMITER ;

-- Create a stored procedure to cancel a booking
DELIMITER $$
CREATE PROCEDURE `CancelBooking` (
    IN p_booking_id INT
)
BEGIN
    DECLARE v_room_id INT;
    DECLARE v_booking_status VARCHAR(255);
    DECLARE v_error_message VARCHAR(255);

    -- Declare a handler to rollback if an error occurs
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Get the diagnostics for the error
        GET DIAGNOSTICS CONDITION 1 v_error_message = MESSAGE_TEXT;

        -- Rollback the transaction
        ROLLBACK;

        -- Raise an SQL exception with the error message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_message;
    END;

    -- Start the transaction
    START TRANSACTION;

    -- Find the current status of the booking and the associated room ID
    SELECT `status`, `room_id` INTO v_booking_status, v_room_id
    FROM `Bookings`
    WHERE `id` = p_booking_id
    FOR UPDATE;

    -- Check if the booking exists and is in a state that can be cancelled
    IF v_booking_status IS NULL THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Booking not found.';
    ELSEIF v_booking_status != 'pending' THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Booking cannot be cancelled at this stage.';
    ELSE
        -- Update the booking status to 'canceled'
        UPDATE `Bookings`
        SET `status` = 'cancelled', `updatedAt` = NOW()
        WHERE `id` = p_booking_id;

        -- Optionally update the room status back to 'available', only if it was 'occupied' due to this booking
        UPDATE `Rooms`
        SET `status` = 'available', `updatedAt` = NOW()
        WHERE `id` = v_room_id AND `status` = 'occupied';
    END IF;

    -- Commit the transaction if all operations succeed
    COMMIT;
END$$
DELIMITER ;

-- Create a stored procedure to edit a booking
DELIMITER $$
CREATE PROCEDURE `EditBooking` (
    IN p_booking_id INT,
    IN p_new_room_id INT,
    IN p_new_date_in DATETIME,
    IN p_new_date_out DATETIME
)
BEGIN
    DECLARE v_existing_room_id INT;
    DECLARE v_existing_status ENUM('pending', 'confirmed', 'cancelled');
    DECLARE v_error_message VARCHAR(255);
    DECLARE v_room_status ENUM('available', 'occupied', 'maintenance');

    -- Declare a handler for rolling back the transaction if an error occurs
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Get the diagnostics for the error
        GET DIAGNOSTICS CONDITION 1 v_error_message = MESSAGE_TEXT;

        -- Rollback the transaction
        ROLLBACK;

        -- Raise an SQL exception with the error message
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_message;
    END;

    -- Begin the transaction
    START TRANSACTION;

    -- Retrieve the existing booking details
    SELECT `room_id`, `status` INTO v_existing_room_id, v_existing_status
    FROM `Bookings`
    WHERE `id` = p_booking_id
    FOR UPDATE;

    -- Check if the booking can be edited
    IF v_existing_status != 'pending' THEN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Booking cannot be edited at this stage.';
    ELSE
        -- Check if the new room is different from the existing one
        IF v_existing_room_id != p_new_room_id THEN
            -- Check if the new room is available
            SELECT `status` INTO v_room_status
            FROM `Rooms`
            WHERE `id` = p_new_room_id AND `deletedAt` IS NULL
            FOR UPDATE;

            IF v_room_status != 'available' THEN
                ROLLBACK;
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The new room is not available for booking.';
            END IF;
        END IF;

        -- Update the booking with new details
        UPDATE `Bookings`
        SET `room_id` = p_new_room_id,
            `date_in` = p_new_date_in,
            `date_out` = p_new_date_out,
            `updatedAt` = NOW()
        WHERE `id` = p_booking_id;

        -- Optionally, update the room statuses if changing rooms
        IF v_existing_room_id != p_new_room_id THEN
            -- Set the original room back to available
            UPDATE `Rooms`
            SET `status` = 'available', `updatedAt` = NOW()
            WHERE `id` = v_existing_room_id AND `deletedAt` IS NULL;

            -- Set the new room to occupied
            UPDATE `Rooms`
            SET `status` = 'occupied', `updatedAt` = NOW()
            WHERE `id` = p_new_room_id AND `deletedAt` IS NULL;
        END IF;
    END IF;

    -- Commit the transaction
    COMMIT;
END$$
DELIMITER ;

-- Create a view to get all bookings
CREATE VIEW GetBookingDetails
AS
SELECT
    b.id AS booking_id,
    b.reference_number,
    b.date_in,
    b.date_out,
    b.status AS booking_status,
    b.createdAt AS booking_created_at,
    b.updatedAt AS booking_updated_at,
    r.id AS room_id,
    r.room_name AS room_name,
    r.status AS room_status,
    r.updatedAt AS room_updated_at,
    c.id AS customer_id,
    c.name AS customer_name,
    c.email AS customer_email,
    c.contact_no AS customer_phone,
    c.createdAt AS customer_created_at,
    c.updatedAt AS customer_updated_at,
    rc.category_name AS room_category_name,
    CalculateDaysBooked( b.date_in, b.date_out) AS number_of_days,
    CalculateTotalPrice(r.id, b.date_in, b.date_out) AS total_price
FROM
    Bookings b
JOIN
    Rooms r ON b.room_id = r.id
JOIN
    Customers c ON b.customer_id = c.id
JOIN
    RoomCategories rc ON r.category_id = rc.id
WHERE
    b.deletedAt IS NULL
ORDER BY
    b.id DESC;



-- Create a view to get all pending bookings
CREATE VIEW GetPendingBookingDetails
AS
SELECT
    b.id AS booking_id,
    b.reference_number,
    b.date_in,
    b.date_out,
    b.status AS booking_status,
    b.createdAt AS booking_created_at,
    b.updatedAt AS booking_updated_at,
    r.id AS room_id,
    r.room_name AS room_name,
    r.status AS room_status,
    r.updatedAt AS room_updated_at,
    c.id AS customer_id,
    c.name AS customer_name,
    c.email AS customer_email,
    c.contact_no AS customer_phone,
    c.createdAt AS customer_created_at,
    c.updatedAt AS customer_updated_at,
    rc.category_name AS room_category_name,
    CalculateDaysBooked( b.date_in, b.date_out) AS number_of_days,
    CalculateTotalPrice(r.id, b.date_in, b.date_out) AS total_price
FROM
    Bookings b
JOIN
    Rooms r ON b.room_id = r.id
JOIN
    Customers c ON b.customer_id = c.id
JOIN
    RoomCategories rc ON r.category_id = rc.id
WHERE
    b.deletedAt IS NULL
    AND b.status = 'pending'
ORDER BY
    b.id DESC;


-- Create a view to get all Checked-in bookings
CREATE VIEW GetCheckInBookingDetails
AS
SELECT
    b.id AS booking_id,
    b.reference_number,
    b.date_in,
    b.date_out,
    b.status AS booking_status,
    b.createdAt AS booking_created_at,
    b.updatedAt AS booking_updated_at,
    r.id AS room_id,
    r.room_name AS room_name,
    r.status AS room_status,
    r.updatedAt AS room_updated_at,
    c.id AS customer_id,
    c.name AS customer_name,
    c.email AS customer_email,
    c.contact_no AS customer_phone,
    c.createdAt AS customer_created_at,
    c.updatedAt AS customer_updated_at,
    rc.category_name AS room_category_name,
    CalculateDaysBooked( b.date_in, b.date_out) AS number_of_days,
    CalculateTotalPrice(r.id, b.date_in, b.date_out) AS total_price
FROM
    Bookings b
JOIN
    Rooms r ON b.room_id = r.id
JOIN
    Customers c ON b.customer_id = c.id
JOIN
    RoomCategories rc ON r.category_id = rc.id
WHERE
    b.deletedAt IS NULL
    AND b.status = 'checked_in'
ORDER BY
    b.id DESC;

-- Check-In procedure
DELIMITER //
CREATE PROCEDURE CheckIn (
    IN p_booking_id INT,
    IN p_check_in_status VARCHAR(255)
)
BEGIN
    DECLARE v_room_id INT;
    DECLARE v_booking_status ENUM('pending', 'confirmed', 'cancelled','checked_in','checked_out');
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback if any error occurs
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred during check-in.';
    END;

    START TRANSACTION;

    -- Get room_id and booking status
    SELECT room_id, status INTO v_room_id, v_booking_status
    FROM Bookings
    WHERE id = p_booking_id;

    -- Verify booking status
    IF v_booking_status NOT IN ('confirmed', 'pending') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Booking must be confirmed or pending for check-in.';
    END IF;

    -- Update booking status to checked-in
    UPDATE Bookings
    SET status = 'checked_in'
    WHERE id = p_booking_id;

    -- Insert record into checkings
    INSERT INTO Checkings (booking_id, status, createdAt, updatedAt)
    VALUES (p_booking_id, p_check_in_status, NOW(), NOW());

    COMMIT;

END //
DELIMITER ;


-- Check-Out procedure
DELIMITER //
CREATE PROCEDURE CheckOut(
    IN p_booking_id INT,
    IN p_check_out_status VARCHAR(255)
)
BEGIN
    DECLARE v_room_id INT;
    DECLARE v_booking_status ENUM('pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled');
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback if any error occurs
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'An error occurred during check-out.';
    END;

    START TRANSACTION;

    -- Get room_id and current booking status
    SELECT room_id, status INTO v_room_id, v_booking_status
    FROM Bookings
    WHERE id = p_booking_id;

    -- Verify booking is currently checked-in
    IF v_booking_status <> 'checked_in' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Booking must be checked-in to proceed with check-out.';
    END IF;

    -- Update booking status to checked-out
    UPDATE Bookings
    SET status = 'checked_out'
    WHERE id = p_booking_id;

    UPDATE Bookings
    SET date_out = NOW()
    WHERE id = p_booking_id;

    -- Update room status to available
    UPDATE Rooms
    SET status = 'available'
    WHERE id = v_room_id;

    -- Insert record into checkings for check-out
    INSERT INTO Checkings (booking_id, status, createdAt, updatedAt)
    VALUES (p_booking_id, p_check_out_status, NOW(), NOW());

    COMMIT;

END //
DELIMITER ;

-- Trigger for update auditlogs table
DELIMITER //
CREATE TRIGGER trg_after_checking_insert_checkin
AFTER INSERT ON Checkings
FOR EACH ROW
BEGIN
    IF NEW.status = 'Checked-in' THEN
        INSERT INTO AuditLogs (event_type, ref_no, room_id, event_timestamp, createdAt, updatedAt)
        VALUES ('Check-in',
                (SELECT reference_number FROM Bookings WHERE id = NEW.booking_id),
                (SELECT room_id FROM Bookings WHERE id = NEW.booking_id),
                NOW(), NOW(), NOW());
    END IF;
END //
DELIMITER ;


-- Trigger for update auditlogs table
DELIMITER //
CREATE TRIGGER trg_after_checking_insert_checkout
AFTER INSERT ON Checkings
FOR EACH ROW
BEGIN
    IF NEW.status = 'Checked-out' THEN
        INSERT INTO AuditLogs (event_type, ref_no, room_id, event_timestamp, createdAt, updatedAt)
        VALUES ('Check-out',
                (SELECT reference_number FROM Bookings WHERE id = NEW.booking_id),
                (SELECT room_id FROM Bookings WHERE id = NEW.booking_id),
                NOW(), NOW(), NOW());
    END IF;
END //
DELIMITER ;