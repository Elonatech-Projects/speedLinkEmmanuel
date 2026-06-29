# Speedlink Learning Platform — Backend API

A full REST API for an online learning platform built with Node.js, Express, MongoDB, and JWT authentication.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcryptjs
- **Validation**: Zod
- **Payment**: Paystack

---

## Setup Instructions

### 1. Navigate to the backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create your .env file
```bash
copy .env.example .env
```

Fill in the values:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PAYSTACK_SECRET_KEY=your_paystack_secret_key
CLIENT_URL=http://localhost:3000
```

### 4. Seed the database
```bash
npm run seed
```

### 5. Start the server
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

---

## Sample Credentials

**Admin**
- Email: `admin@speedlink.com`
- Password: `Admin@1234`

**Student**
- Email: `student@speedlink.com`
- Password: `Student@1234`

---

## API Endpoints

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |

### Courses
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/courses` | Public | Get all courses (supports `?search=`, `?category=`, `?page=`, `?limit=`) |
| GET | `/api/courses/:id` | Public | Get single course |
| POST | `/api/courses` | Admin | Create course |
| PUT | `/api/courses/:id` | Admin | Update course |
| DELETE | `/api/courses/:id` | Admin | Delete course |

### Cart
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/cart` | Student | Add course to cart |
| GET | `/api/cart` | Student | View cart |
| DELETE | `/api/cart/:id` | Student | Remove from cart |

### Enrollment
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/enroll` | Student | Enroll in a course |
| GET | `/api/my-courses` | Student | View enrolled courses |

### Payment
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/payment/initialize` | Student | Initialize Paystack payment |
| GET | `/api/payment/verify?reference=xxx` | Student | Verify payment + auto-enroll |

### Admin
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/admin/users` | Admin | View all users |
| GET | `/api/admin/courses` | Admin | View all courses |
| GET | `/api/admin/transactions` | Admin | View all transactions |

---

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned on login and registration.

---

## Deployment (Render)

1. Push the repo to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `npm start`
7. Add environment variables (same as .env)
8. Deploy

---

## Folder Structure

```
backend/
  config/         MongoDB connection
  controllers/    Route logic
  middleware/     Auth, admin, validation, error handler
  models/         Mongoose schemas
  routes/         Express routers
  utils/          Seed script
  validators/     Zod schemas
  server.js       Entry point
```
