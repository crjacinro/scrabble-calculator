# Scrabble Calculator

A scrabble scoring application built with **React + TypeScript** frontend and **Kotlin Spring Boot** backend. This application allows users to calculate Scrabble scores and track high scores.

## 🏗️ Project Structure

```
scrabble-calculator/
├── frontend/          # React + TypeScript application
├── backend/           # Kotlin Spring Boot application
└── docker-compose.yml # Docker orchestration
```

## 🚀 Quick Start with Docker

The fastest way to run the entire application is using Docker Compose.
Make sure your ports 8080 and 3000 are free before running.

```bash
# Clone the repository
git clone https://github.com/crjacinro/scrabble-calculator
cd scrabble-calculator

# Make sure docker is running before doing the command below:
# Start both frontend and backend services
docker compose up -d --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# API Documentation: http://localhost:8080/api/v1/swagger-ui.html
```

In case your ports are used, use the following commands to kill the processes:

```bash
kill $(lsof -t -i:8080)
kill $(lsof -t -i:3000)
```

### Docker Services

- **Frontend**: React app running on port 3000
- **Backend**: Spring Boot API running on port 8080
- **Database**: H2 in-memory database with persistent storage

## 📚 Detailed Documentation

For comprehensive setup and development instructions, see the specific README files:

- **[Frontend](./frontend)** - React app setup, development, and testing
- **[Backend](./backend)** - Spring Boot setup, API documentation, and testing

## 🎯 Features

- **Score Calculation**: Calculate Scrabble scores based on pre-configured rules
- **High Score Tracking**: Save and retrieve top 10 scores
- **RESTful API**: Backend API with Swagger documentation
- **Modern UI**: Responsive React frontend with Tailwind CSS
- **Cross-Platform**: Docker support for consistent deployment

## 🔧 Prerequisites

- **Docker & Docker Compose** (for quick start)
- **Node.js 18+** (for frontend development)
- **Java 21+** (for backend development)
- **Gradle 8+** (for backend build)

## 🌐 API Endpoints

- `GET /rules` - Retrieve letter scoring rules
- `GET /scores?top=10` - Get top 10 scores
- `POST /scores` - Save a new score

## 📖 API Documentation

Once the backend is running, access the interactive API documentation at:
**http://localhost:8080/api/v1/swagger-ui.html**

## 🧪 Testing

Both frontend and backend include comprehensive test suites:

- **Frontend**: Vitest + React Testing Library
- **Backend**: JUnit 5 + MockK

## 🤖 CI/CD Integration

Through Github actions, changes detected in `src` directories will run the pipeline.

See the [Actions History](https://github.com/crjacinro/scrabble-calculator/actions) for more details.