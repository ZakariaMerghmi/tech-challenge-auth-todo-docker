
```markdown
# 🛡️ Fullstack JWT Auth + Todo App

A full-stack containerized application built as part of a technical challenge. It features:

- ✅ A User Service (authentication + JWT)
- ✅ A Todo Service (CRUD operations with JWT protection)
- ✅ A minimal Frontend (React)
- ✅ Dockerized setup with PostgreSQL- 


---

## 📁 Project Structure

challenge/
├── user-service/         # Authentication service (register/login)
├── todo-service/         # Todo CRUD API
├── todo-client/todo-client             # Simple login + todo UI
├── docker-compose.yml    # Orchestrates the 3 services + databases
├── README.md
└── node_modules
|__ package-lock.json
|__ postman_collection.json
---

## ⚙️ Technologies Used

| Layer       | Stack                        |
|-------------|------------------------------|
| Backend     | Node.js, Express, TypeScript |
| Database    | PostgreSQL                   |
| Frontend    | React (basic setup)          |
| Auth        | JWT                          |
| Container   | Docker, Docker Compose       |

---

## 🚀 Getting Started

> Make sure you have **Docker** and **Docker Compose** installed.

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/auth-todo-system.git
cd auth-todo-system

### 2. Run the full system

docker-compose up --build

### 3. Services Running

| Service         | URL                    |
|-----------------|------------------------|
| User Service    | http://localhost:4000  |
| Todo Service    | http://localhost:4001  |
| Todo Client (UI)   | http://localhost:3000  |

---

## 🔐 Authentication Flow

1. Register a user via POST /register (User Service)
2. Login via POST /login → returns a JWT token
3. Include this token as Authorization: Bearer <token> in requests to the Todo Service

---

## 📚 API Documentation

You’ll find a ready-to-import Postman Collection in:

postman_collection.json

It includes:

- User: Register/Login
- Todo: Create/Read/Update/Delete

---

## 🧪 Running Tests

Tests are implemented using Jest and Supertest.

To run tests:

# Inside user-service or todo-service folder
npm install
npm run test

---

## 🐳 Docker Overview

Each service includes its own Dockerfile. docker-compose.yml manages the entire stack.

### Common commands:

# Rebuild containers after code changes
docker-compose up --build

# Stop services
docker-compose down

---

## ✨ Features Implemented

- [x] User registration and login
- [x] JWT authentication
- [x] Protected todo endpoints (CRUD)
- [x] PostgreSQL databases for each service
- [x] Docker + Docker Compose
- [x] Minimal React UI
- [x] Unit testing
- [x] Postman API collection

---

## 📝 Environment Variables

You can find .env.example in each backend folder. Make sure to create your own .env files.

Example for user-service/.env:

PORT=4000
JWT_SECRET=your_jwt_secret_key
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=user_db

---

## 📩 Contact

thx for reaching out if you have qs I'm available via mail you can find it in the bio or the main README ;)

---

Thank you for reviewing the project!
```



