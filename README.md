# TaskManager - MERN Stack Application

A full-stack task management application built with MongoDB, Express.js, React, and Node.js (MERN stack). Features user authentication, protected routes, and complete CRUD operations for task management.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-ISC-blue)

## 🚀 Features

### Authentication & Security
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Protected routes and API endpoints
- ✅ Automatic token management

### Task Management
- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as completed or pending
- ✅ Search tasks by title or description
- ✅ Filter tasks by status (all/completed/pending)
- ✅ User-specific task isolation

### User Experience
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Smooth animations and transitions
- ✅ Loading and error states
- ✅ Form validation
- ✅ Modal-based task creation/editing

## 📁 Project Structure

```
assignment/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── SignupPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── DashboardPage.jsx
│   │   ├── services/      # API services
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   └── taskService.js
│   │   ├── context/       # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── utils/         # Utility functions
│   │   │   └── validation.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── server/                # Node.js backend
    ├── config/            # Configuration
    │   └── db.js
    ├── models/            # Mongoose models
    │   ├── User.js
    │   └── Task.js
    ├── routes/            # API routes
    │   ├── auth.js
    │   ├── user.js
    │   └── tasks.js
    ├── middleware/        # Custom middleware
    │   └── auth.js
    ├── controllers/       # Route controllers
    │   ├── authController.js
    │   ├── userController.js
    │   └── taskController.js
    ├── server.js          # Entry point
    ├── package.json
    └── .env
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS v3** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher) - Running locally or MongoDB Atlas account

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd assignment
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (or copy from .env.example)
# Edit the .env file with your configuration
```

**Environment Variables (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
# Start MongoDB service
mongod
```

**MongoDB Atlas:**
- No action needed if using cloud database

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend will run on `http://localhost:5173`

## 🔐 Authentication Flow

### 1. User Registration
- User fills signup form with name, email, and password
- Frontend validates input (email format, password length, required fields)
- Password is hashed with bcrypt on the backend
- User data is saved to MongoDB
- User is redirected to login page

### 2. User Login
- User enters email and password
- Backend verifies credentials
- JWT token is generated and sent to client
- Token is stored in localStorage
- User data is stored in AuthContext
- User is redirected to dashboard

### 3. Protected Routes
- PrivateRoute component checks for valid token
- Axios interceptor attaches token to all API requests
- Backend middleware verifies JWT on protected endpoints
- Invalid/expired tokens redirect to login

### 4. Logout
- Token and user data removed from localStorage
- AuthContext cleared
- User redirected to login page

## 📡 API Endpoints

### Authentication Routes
```
POST /api/auth/signup    - Register new user
POST /api/auth/login     - Login user
```

### User Routes (Protected)
```
GET  /api/user/profile   - Get user profile
PUT  /api/user/profile   - Update user profile
```

### Task Routes (Protected)
```
GET    /api/tasks        - Get all user tasks
POST   /api/tasks        - Create new task
PUT    /api/tasks/:id    - Update task
DELETE /api/tasks/:id    - Delete task
```

## 🧪 Testing with Postman

Import the `MERN-App.postman_collection.json` file into Postman to test all API endpoints.

**Testing Flow:**
1. Register a new user (POST /api/auth/signup)
2. Login with credentials (POST /api/auth/login)
3. Copy the JWT token from login response
4. Set token in Postman environment or Authorization header
5. Test protected endpoints (user profile, tasks)

## 📱 Usage Guide

### Creating an Account
1. Navigate to `http://localhost:5173`
2. Click "Sign Up"
3. Fill in your name, email, and password
4. Click "Sign Up" button
5. You'll be redirected to login page

### Logging In
1. Enter your email and password
2. Click "Login"
3. You'll be redirected to your dashboard

### Managing Tasks
1. **Create Task**: Click "+ Add Task" button
2. **Edit Task**: Click "Edit" on any task card
3. **Delete Task**: Click "Delete" on any task card
4. **Mark Complete**: Check the checkbox on task card
5. **Search**: Use the search bar to filter tasks
6. **Filter**: Use dropdown to show all/pending/completed tasks

## 🚀 Production Deployment

### Scaling Recommendations

#### 1. **Database Optimization**
- Use MongoDB Atlas for managed database
- Implement database indexing on frequently queried fields
- Set up database replication for high availability
- Use connection pooling

#### 2. **Backend Optimization**
- Deploy on cloud platforms (AWS, Heroku, DigitalOcean)
- Use PM2 for process management
- Implement rate limiting to prevent abuse
- Add request logging and monitoring
- Use Redis for session management and caching
- Implement API versioning

#### 3. **Frontend Optimization**
- Build production bundle: `npm run build`
- Deploy on Vercel, Netlify, or AWS S3 + CloudFront
- Implement code splitting and lazy loading
- Use CDN for static assets
- Enable gzip compression
- Implement service workers for offline support

#### 4. **Security Enhancements**
- Use HTTPS in production
- Implement refresh tokens
- Add rate limiting on authentication endpoints
- Use helmet.js for security headers
- Implement CSRF protection
- Regular security audits
- Environment-specific configurations

#### 5. **Monitoring & Logging**
- Implement error tracking (Sentry, LogRocket)
- Set up application monitoring (New Relic, DataDog)
- Configure alerts for critical errors
- Implement analytics (Google Analytics, Mixpanel)

#### 6. **CI/CD Pipeline**
- Set up automated testing
- Implement continuous integration (GitHub Actions, Jenkins)
- Automated deployment on merge to main branch
- Staging environment for testing

### Environment Variables for Production

```env
# Backend (.env)
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
JWT_EXPIRE=30d
CORS_ORIGIN=https://your-frontend-domain.com

# Frontend (.env.production)
VITE_API_URL=https://your-backend-domain.com/api
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check MongoDB URI in .env file
- For Atlas: Whitelist your IP address

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### CORS Errors
- Ensure backend CORS is configured correctly
- Check Vite proxy configuration in `vite.config.js`

### JWT Token Issues
- Clear localStorage in browser
- Check JWT_SECRET matches in .env
- Verify token expiration time

## 📄 License

ISC

## 👨‍💻 Author

Built as a demonstration of MERN stack development best practices.

## 🙏 Acknowledgments

- React Documentation
- Express.js Documentation
- MongoDB Documentation
- Tailwind CSS Documentation
