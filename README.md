# 🏥 Benefits — Health Insurance Claims Management App

A full-stack web application for managing health insurance claims. Members can submit and track claims, while admins can review, approve, or reject them.  
Built with **React + TypeScript (frontend)** and **Spring Boot + PostgreSQL (backend)**.

The database is already dockerized.  
Backend runs on **port 8080**.  
Database name is **benefits**, and the password is **postgres**.

---

## 🚀 Features
- Secure login and registration using Google OAuth2.
- Persistent login via localStorage.
- Members can view, and track claims.
- Spring Boot REST API and GraphQL with PostgreSQL database.

---

## 🧩 Tech Stack

| Layer | Technologies                                                     |
|-------|------------------------------------------------------------------|
| Frontend | React, TypeScript, React Router, Context API, Axios, TailwindCSS |
| Backend | Spring Boot 3, Spring Data JPA, Hibernate, JWT, OAuth2, GrapgQL  | 
| Database | PostgreSQL                                                       | 
| Deployment | Docker (database only)                                           |
| Build Tools | Maven, Vite                                                      |

## 📦 Project Structure Overview

---

### ⚙️ Root Directory
```
benefits-mini/
├── backend/
├── frontend/
├── docker-compose.yml # Runs database
└── README.md # Full setup and documentation
```

## 🖥️ Local Development Setup

### Prerequisites
- Java 17+ (for Spring Boot)
- Maven (for building the backend)
- Node.js 18+ (for React frontend)
- PostgreSQL 16+
- Docker (optional, for containerized DB)


### 1. Database

#### Option A: Start PostgreSQL with Docker

**Database credentials:**

- Name: `benefits`
- Username: `postgres`
- Password: `postgres`
- Port: `5432`

**Start database:**

```bash
 docker-compose up -d
```
#### Option B: Local PostgreSQL Installation (No Docker)

1. Install PostgreSQL on your machine.

2. Create a database and user:
```
# Create database
createdb benefits

# Create user with password
psql -c "CREATE USER postgres WITH PASSWORD 'postgres';"

# Grant privileges
psql -c "GRANT ALL PRIVILEGES ON DATABASE benefits TO postgres;"
```
3. Make sure the database is running on port `5432`.

### 2. Backend (Spring Boot)

- Backend runs on **port`8080`**.
- Connects to the PostgreSQL database (`benefits`).
- Ensure your database (Docker or local) is running before starting.

**Start backend:**

```
cd backend
mvn clean install
mvn spring-boot:run
```
- API will run at http://localhost:8080.
### 3. Frontend (React + TypeScript)

- Default dev server: `http://localhost:5173`.
- Communicates with backend using Axios.
- JWT stored in **localStorage** for session persistence.

**Install dependencies and start frontend:**

```
cd frontend
npm install
npm start
```