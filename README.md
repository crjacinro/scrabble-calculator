# Scrabble Calculator

A comprehensive Scrabble scoring application built with **React + TypeScript** frontend and **Kotlin Spring Boot** backend. This application allows users to calculate Scrabble scores, manage letter rules, and track high scores.

## 🏗️ Project Structure

```
scrabble-calculator/
├── frontend/          # React + TypeScript application
├── backend/           # Kotlin Spring Boot application
└── docker-compose.yml # Docker orchestration
```

## 🚀 Quick Start with Docker

The fastest way to run the entire application is using Docker Compose:

```bash
# Clone the repository
git clone <your-repo-url>
cd scrabble-calculator

# Start both frontend and backend services
docker-compose up --build

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:8080
# API Documentation: http://localhost:8080/swagger-ui.html
```

### Docker Services

- **Frontend**: React app running on port 3000
- **Backend**: Spring Boot API running on port 8080
- **Database**: H2 in-memory database with persistent storage

## 📚 Detailed Documentation

For comprehensive setup and development instructions, see the specific README files:

- **[Frontend README](./frontend/README.md)** - React app setup, development, and testing
- **[Backend README](./backend/README.md)** - Spring Boot setup, API documentation, and testing

## 🎯 Features

- **Letter Rules Management**: Configure custom point values for letters
- **Score Calculation**: Calculate Scrabble scores based on configured rules
- **High Score Tracking**: Save and retrieve top scores
- **RESTful API**: Clean backend API with Swagger documentation
- **Modern UI**: Responsive React frontend with Tailwind CSS
- **Cross-Platform**: Docker support for consistent deployment

## 🔧 Prerequisites

- **Docker & Docker Compose** (for quick start)
- **Node.js 18+** (for frontend development)
- **Java 21+** (for backend development)
- **Gradle 8+** (for backend build)

## 🌐 API Endpoints

- `GET /rules` - Retrieve letter scoring rules
- `GET /scores?top=10` - Get top scores
- `POST /scores` - Save a new score

## 📖 API Documentation

Once the backend is running, access the interactive API documentation at:
**http://localhost:8080/swagger-ui.html**

## 🧪 Testing

Both frontend and backend include comprehensive test suites:

- **Frontend**: Vitest + React Testing Library
- **Backend**: JUnit 5 + MockK

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 8080 are available
2. **Docker build failures**: Check Dockerfile syntax and dependencies
3. **Database connection**: Verify H2 database configuration

### Logs

```bash
# View all service logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 