# Scrabble Calculator Backend

A Kotlin Spring Boot backend API for the Scrabble Calculator application, providing simple letter rules and score tracking with a RESTful interface.

## 🚀 Quick Start

### Running the application using IntelliJ

For better development experience, use IntelliJ IDEA Kotlin and Spring Boot plugins. Simply run the application from the IDE.

### Running the application using Docker Compose

1. Using terminal, navigate to the `scrabble-calculator/backend` directory and run the following command:
```bash
docker compose up -d --build
```
This will run the backend as a standalone container.

In case your port 8080 is used, use the following commands to kill the process using it:

```bash
kill $(lsof -t -i:8080)
```

## 🏗️ Project Overview

This backend service provides:
- **Letter Rules API**: Retrieve letter scoring rules
- **Score Management**: Save and retrieve high scores
- **RESTful Endpoints**: APIs with corresponding HTTP methods
- **Swagger Documentation**: API documentation
- **H2 Database**: In-memory database with persistent storage

## 🔧 Prerequisites

- **Java**: Version 21 or higher
- **Kotlin**: Version 1.9.25 or higher
- **Gradle**: Version 8.0 or higher (wrapper included)
- **Docker**: Recommended for containerized runtime

## 🔢 Version Check

```bash
java --version    # Should be >= 21
kotlin --version  # Should be >= 1.9.25
./gradlew --version  # Should be >= 8.0
```
## 🧪 Testing

```bash
# Run all tests
./gradlew test
```

## 🤖 CI/CD Integration

Through Github actions, changes detected in `src` directories will run the pipeline.

See the [Actions History](https://github.com/crjacinro/scrabble-calculator/actions) for more details.

## 📖 API Documentation

Once the application is running, access the interactive API documentation at:
**http://localhost:8080/api/v1/swagger-ui/index.html**

## 📁 Project Structure

```
src/
├── main/
│   ├── kotlin/
│   │   └── org/example/backend/
│   │       ├── controllers/       # REST controllers
│   │       ├── dto/               # Data transfer objects
│   │       ├── entities/          # JPA entities
│   │       ├── repositories/      # Data access layer
│   │       └── services/          # Business logic
│   └── resources/
│       ├── application.properties # Configuration
│       ├── schema.sql             # Database schema
└── test/
    └── kotlin/                    # Test classes
```

## 🔗 Dependencies

### Core Dependencies

- **Spring Boot 3.5.5**: Main framework
- **Kotlin 1.9.25**: Programming language
- **Spring Data JPA**: Data persistence
- **Spring Web**: REST API support
- **H2 Database**: In-memory database

### Development Dependencies

- **Spring Boot Test**: Testing framework
- **MockK 1.13.12**: Kotlin mocking library
- **SpringMockK 4.0.2**: Spring integration for MockK
- **JUnit 5**: Unit testing