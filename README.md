
# Hotel Booking Management System

This project is a comprehensive Hotel Booking Management System designed to streamline hotel operations, including room and customer management, booking creation and cancellation, and administrative oversight. It provides a robust and user-friendly platform to manage hotel operations effectively.

---

## Key Features

### 1. Room Management
- Add, update, and delete room information, including room types, rates, and availability.
- View detailed room statuses, such as occupancy and maintenance schedules.

### 2. Customer Management
- Maintain customer records with personal details and booking history.
- Secure customer authentication and authorization mechanisms.
- Send automated notifications for booking confirmations and updates.

### 3. Booking System
- Create, modify, and cancel bookings seamlessly.
- Check real-time room availability.
- Support for individual and group bookings.

### 4. Admin Dashboard
- Access centralized control for managing all hotel operations.
- Generate insightful analytics reports on bookings, revenue, and customer demographics.
- Manage user roles and permissions (Admin, Staff, Customer).

### 5. Security Features
- Encrypted user passwords using industry-standard algorithms.
- Role-based access control (RBAC) for sensitive operations.
- Regular security audits for database and APIs.

---

## Technologies Used

### Backend
- **Node.js**: For server-side logic and API management.
- **Express.js**: For building robust RESTful APIs.
- **Sequelize ORM**: For database interaction and migrations.
- **MySQL**: As the primary relational database.

### Frontend
- **React.js**: For building an interactive user interface.
- **Redux**: For state management.
- **Tailwind CSS**: For responsive and modern UI design.

### Other Tools
- **Docker**: For containerizing the application and managing environments.
- **Postman**: For API testing.
- **Jest**: For unit and integration testing.

---

## Installation Guide

### Prerequisites
- **Node.js** (v14 or higher)
- **MySQL** (v8.0 or higher)
- **Docker** (optional but recommended for deployment)

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/FOT-Group-Project/Hotel-Booking-Management-System.git
cd Hotel-Booking-Management-System
```

#### 2. Backend Setup
- Navigate to the backend directory:
  ```bash
  cd backend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Configure the database connection in the `.env` file:
  ```env
  DB_HOST=your_database_host
  DB_USER=your_database_user
  DB_PASS=your_database_password
  DB_NAME=your_database_name
  JWT_SECRET=your_jwt_secret
  ```
- Run database migrations:
  ```bash
  npx sequelize db:migrate
  ```
- Start the backend server:
  ```bash
  npm start
  ```

#### 3. Frontend Setup
- Navigate to the frontend directory:
  ```bash
  cd ../frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the frontend development server:
  ```bash
  npm start
  ```

#### 4. Access the Application
- Open your browser and navigate to `http://localhost:3000` to access the application.

---

## Database Schema

### Overview
The system uses a MySQL database with the following main tables:

1. **Users**: Stores user details, roles, and authentication data.
2. **Rooms**: Contains information about room types, rates, and availability.
3. **Bookings**: Tracks all booking transactions, including status and timestamps.
4. **Payments**: Manages payment records, including amounts and payment methods.

---

## Contributing

We welcome contributions to enhance the functionality of this system. Please follow these steps:

1. **Fork the Repository**:
   - Click the "Fork" button at the top right corner of this page.
2. **Clone Your Fork**:
   ```bash
   git clone https://github.com/your-username/Hotel-Booking-Management-System.git
   cd Hotel-Booking-Management-System
   ```
3. **Create a Branch**:
   ```bash
   git checkout -b feature-name
   ```
4. **Make Your Changes**:
   - Implement your feature or fix bugs.
5. **Commit and Push**:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin feature-name
   ```
6. **Submit a Pull Request**:
   - Go to the original repository and click "New Pull Request".

---

## Deployment

### Using Docker
1. Build the Docker images:
   ```bash
   docker-compose build
   ```
2. Start the containers:
   ```bash
   docker-compose up
   ```
3. Access the application on `http://localhost`.

### Manual Deployment
- Follow the backend and frontend setup steps on the server environment.
- Use a process manager like PM2 for the backend.
- Use a production-ready frontend build (`npm run build`) for deployment.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact
For any inquiries or support, please contact the project maintainers through the repository's GitHub page.

---

This README provides a detailed overview of the Hotel Booking Management System, including setup instructions, key features, and contributing guidelines. For additional details, refer to the documentation in the repository.
