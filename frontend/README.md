# Scrabble Calculator Frontend

A modern, responsive React application for calculating Scrabble scores with a beautiful UI built using TypeScript, Tailwind CSS, and DaisyUI.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```

## 🏗️ Project Overview

This frontend application provides an intuitive interface for:
- **Letter Grid Management**: Interactive grid for placing letters
- **Score Calculation**: Real-time score computation based on backend rules
- **High Score Tracking**: View and compare top scores
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🔧 Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher (comes with Node.js)
- **Backend Service**: Spring Boot backend running on port 8080

### Version Check

```bash
node --version  # Should be >= 18.0.0
npm --version   # Should be >= 9.0.0
```

## 📦 Installation

```bash
# Clone the repository (if not already done)
git clone <your-repo-url>
cd scrabble-calculator/frontend

# Install dependencies
npm install
```

## 🛠️ Development

### Development Server

```bash
# Start development server with hot reload
npm run dev

# The application will be available at:
# http://localhost:5173
```

### Build Commands

```bash
# Build for production
npm run build

# Preview production build locally
npm run serve

# The production build will be available at:
# http://localhost:4173
```

## 🧪 Testing

### Test Commands

```bash
# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run
```

### Test Coverage

The test suite includes:
- **Component Testing**: Using React Testing Library
- **Unit Testing**: Vitest for fast test execution
- **Integration Testing**: API integration tests
- **UI Testing**: Component behavior and user interactions

### Test Structure

```
src/
├── components/
│   └── __tests__/          # Component tests
├── screens/
│   └── __tests__/          # Screen tests
└── test/                   # Test utilities and setup
```

## 🎨 Styling & UI

### Technologies Used

- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library built on Tailwind
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Automatic vendor prefixing

### Custom Styling

```bash
# Custom CSS files
src/styles/
├── arrow.css              # Custom arrow animations
└── index.css              # Global styles and Tailwind imports
```

## 🔌 API Integration

### Backend Communication

The frontend communicates with the backend API endpoints:

- **Base URL**: `http://localhost:8080`
- **CORS**: Configured for local development
- **Endpoints**:
  - `GET /rules` - Letter scoring rules
  - `GET /scores` - High scores
  - `POST /scores` - Save new scores

### API Configuration

```typescript
// src/domain/config.ts
export const API_BASE_URL = 'http://localhost:8080';
```

## 📱 Features

### Core Functionality

1. **Letter Grid**: Interactive 15x15 grid for Scrabble gameplay
2. **Score Calculation**: Real-time scoring based on letter rules
3. **Rule Management**: Display and apply letter scoring rules
4. **Score History**: Track and display high scores
5. **Responsive Design**: Mobile-friendly interface

### User Experience

- **Toast Notifications**: User feedback and error handling
- **Loading States**: Smooth loading indicators
- **Modal Dialogs**: Score submission and confirmation
- **Keyboard Navigation**: Accessible keyboard controls

## 🚀 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# The build artifacts will be in the `dist/` directory
```

### Docker Deployment

```bash
# Build Docker image
docker build -t scrabble-frontend .

# Run container
docker run -p 3000:80 scrabble-frontend
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Error: Port 5173 is already in use
# Solution: Kill the process or use a different port
lsof -ti:5173 | xargs kill -9
```

#### 2. Dependencies Installation Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. Build Failures

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Verify Vite configuration
npx vite --version
```

#### 4. Backend Connection Issues

- Ensure backend is running on port 8080
- Check CORS configuration in backend
- Verify network connectivity

### Development Tips

1. **Hot Reload**: Changes automatically refresh in development mode
2. **TypeScript**: Use strict mode for better code quality
3. **ESLint**: Configured with Prettier for consistent formatting
4. **Testing**: Write tests alongside component development

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
├── screens/             # Page-level components
├── router/              # React Router configuration
├── domain/              # Business logic and types
├── data/                # API response types and mock data
├── styles/              # CSS and styling files
└── test/                # Test setup and utilities
```

## 🔗 Dependencies

### Core Dependencies

- **React 18.2.0**: Modern React with hooks
- **TypeScript 5.3.3**: Type-safe JavaScript
- **Vite 4.4.9**: Fast build tool and dev server
- **React Router 6.21.3**: Client-side routing

### UI Dependencies

- **Tailwind CSS 3.4.1**: Utility-first CSS
- **DaisyUI 4.6.1**: Component library
- **Headless UI 1.7.18**: Unstyled accessible components

### Development Dependencies

- **Vitest 3.2.4**: Fast unit testing
- **React Testing Library**: Component testing utilities
- **ESLint + Prettier**: Code quality and formatting

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest Testing](https://vitest.dev/)

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Write tests for new components and features
3. Ensure TypeScript compilation passes
4. Test on multiple screen sizes for responsiveness

## 📄 License

This project is licensed under the MIT License.
