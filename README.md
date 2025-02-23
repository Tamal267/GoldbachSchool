Goldbach School is a modern, interactive education platform designed to connect students with top coaching centers and courses.

[![Project Overview Video](https://github.com/Tamal267/GoldbachSchool/blob/main/frontend/public/Assets/thumbnail.png?raw=true)](https://youtu.be/2tD3IqcQpms)

# Frontend Overview

The Goldbach School frontend is a modern, interactive application built using Next.js. It leverages Tailwind CSS for responsive design and Framer Motion for smooth, engaging animations. The project is organized into modular pages covering various features such as coaching centers, courses, exams, and performance dashboards.

## Key Features

- **Dynamic Routing & Modular Structure**

- **Interactive Search & Navigation**

- **Rich Content & Media Presentation**

- **Real-Time Notifications & Monitoring**

## User Rules

### Authority

- **Create New Coaching Center**

- **Create Course and Allocate Teachers**

- **Payment Teachers**

### Teachers

- **Create New Class or Exam**

- **Evaluate Exam Scripts**

- **View Class performance on Students Reviews**

### Students

- **Buy New Course**

- **Takeing Exam & See Mark and Feedback**

- **Review on Classes**

# Backend Overview

The Goldbach School backend is a robust and secure API built with Hono and Supabase (PostgreSQL). It handles user authentication, course management, notifications, and more. The API features several complex SQL queries that join multiple tables, aggregate data, and calculate ratings, courses, and progress percentages. These queries efficiently process large datasets, supporting features such as:

- Role-based access control for users (Authority, Teacher, Student)
- Real-time notification counts and paginated retrieval
- Aggregated metrics on courses, coaching centers, and teacher/student performance

Overall, the backend efficiently manages intricate database operations while ensuring secure data access and a responsive API for the education platform.

# Installation

Clone this repository first. Run `git clone https://github.com/Tamal267/GoldbachSchool`.

## For Frontend

Add a `env` file. The `./frontend/.env.local` file includes:

```bash
SERVER_URL=https://your-server-url.com
HOST_NAME=your-host-name
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Then install all dependencies and run in your local machine.

```bash
cd frontend && npm install --force && npm run dev
```

## For Backend

Add a `env` file. The `./backend/.env.local` file includes:

```bash
PORT=YourBackendPort
DATABASE_URL=YourDatabaseURL
EMAIL_PASS=YourEmailPasskey
EMAIL_USER=YourEmailUser
SECRET=YourSecretKey
```

Then install all dependencies and run in your local machine.

```bash
cd backend && bun install && bun run dev
```
