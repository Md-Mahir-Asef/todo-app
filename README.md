# 📝 Todo App

A full-stack Todo application built using modern technologies like TypeScript, Vite, React, Node.js, Docker, Prisma, and PostgreSQL. Todo App lets you manage you tasks (Create, View, Update and Delete) with a user friendly UI. It is fully containerized so it is easy to diploy. It follows basic security principles. It manages user authentication by it self. It persists log in with JWT. It does clear and verbose logging in the server side so it is easy to debug 

---

## 📌 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [What I Learned](#-what-i-learned)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)

---

## ⚙️ Tech Stack

### Frontend

- Vite
- React
- TypeScript

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

### DevOps & Tooling

- Docker & Docker Compose
- ESLint & Prettier
- GitHub

---

## ✅ Features

> Completed

- [x] Create, update, delete todos
- [x] Store todos in database
- [x] User authentication
- [x] Persistent login (JWT / cookies)
- [x] Logging in server side with Winston

> In Progress

- [ ] Filter/search todos
- [ ] CI/CD setup
- [ ] Email verification

---

## 📝 API Documentation

### 📦 Postman Collection

- Download or import the full Postman collection:  
  [todo-app-collection.json](./docs/api-docs/Todo-App.postman_collection.json)

### 📘 Human-Readable Docs (Markdown)

- See [docs/api-docs.md](./docs/API-Documentation.md) for detailed endpoint documentation.

### 🌐 Online Docs (Optional)

- Live docs hosted via Postman: [View Here](https://documenter.getpostman.com/view/37884508/2sB34ZrPh8)

---

## 📖 What I Learned

- Containerizing my project with Docker
- Managing containers with Docker Compose
- User authentication
- Persistent login with JWT and cookies
- Logging in server side with Winston
- Seeding dummy information into database in development environment
- Managing database schema and migrations with Prisma

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Git

### Local Setup

```bash
git clone https://github.com/Md-Mahir-Asef/todo-app.git
cd todo-app
docker-compose up --build
```
