# Scrabble Calculator Frontend

A React application for calculating Scrabble scores with UI built using TypeScript, Tailwind CSS, and DaisyUI.

## 🚀 Quick Start

### Using NPM

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Using Docker Compose

1. Using terminal, navigate to the `scrabble-calculator/frontend` directory and run the following command:

```bash
docker compose up -d --build
```

This will run the frontend as a standalone container

## 🏗️ Project Overview

This frontend application provides an interface for:

- **Letter Grid**: Interactive grid for typing letters
- **Score Calculation**: Real-time score computation based on rules
- **High Score Tracking**: View and compare top scores

## 🔧 Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **Backend Service**: The corresponding backend running on port 8080

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/             # Page-level components
├── router/              # React Router configuration
├── domain/              # Business logic and types
├── data/                # API models
└── styles/              # CSS and styling files
```

## 🧪 Unit Testing, UI Testing and Linting

### Unit Test Commands

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run
```

### Lint Command

```bash
# Run the linter
npm run lint
```

### UI Testing with Storybook

```bash
# Run the storybook server
npm run storyboook
# You can access it at http://localhost:6006
```

## 🎨 Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind

## 🔌 API Integration

The frontend communicates with the backend API endpoints:

- **Base URL**: `http://localhost:8080/api/v1`
- **Endpoints**:
  - `GET /rules` - Letter scoring rules
  - `GET /scores` - High scores
  - `POST /scores` - Save new scores
