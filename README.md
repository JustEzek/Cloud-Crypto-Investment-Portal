# Cloud Crypto Investment Portal

Final project for Software Engineering 480. This project demonstrates a multi-tier web application using a React frontend, Node/Express web server, Sequelize ORM, MySQL database, Docker, AWS deployment concepts, session management, HTML/CSS, MetaMask, and Ethereum wallet integration.

## Project Summary

Cloud Crypto Investment Portal is a secure investment dashboard. Users log in through the web server, the server creates a session, and the application shows investment balances based on the user's role.

- Customers see only their own investments.
- Employees and admins can see all customer investments.
- Logged-out users cannot access the investment page.
- Users can connect MetaMask to attach an Ethereum wallet address to their profile.
- MySQL stores users, investment balances, and wallet addresses.
- Sequelize provides the database model layer.
- Docker Compose runs the frontend, backend, and database together.

## Technology Checklist

- Web server: Node.js with Express
- Frontend: React, HTML, CSS
- Database: MySQL
- ORM: Sequelize
- Sessions: express-session with HTTP-only cookies
- Cloud: AWS EC2 deployment plan
- Containers: Docker and Docker Compose
- Ethereum: MetaMask wallet connection
- Optional automation: Makefile

## Folder Structure

```text
backend/       Express server, sessions, Sequelize models, API routes
frontend/      React app and MetaMask UI
database/      SQL schema for MySQL
docs/          AWS deployment guide, demo script, checklist
docker-compose.yml
Makefile
.env.example
```

## Quick Demo Login Accounts

These accounts are created by the seed script:

| User ID | Password | Role | Demo result |
| --- | --- | --- | --- |
| alice | password123 | Customer | Sees only Alice investments |
| bob | password123 | Customer | Sees only Bob investments |
| erin | employee123 | Employee | Sees all investments |
| admin | admin123 | Admin | Sees all investments |

## Installation With Docker

1. Install Docker Desktop.
2. Open a terminal in this project folder.
3. Copy the environment file:

```bash
cp .env.example .env
```

4. Start the full project:

```bash
docker compose up --build
```

5. Seed the database in a second terminal:

```bash
docker compose exec backend npm run seed
```

6. Open the app:

```text
http://localhost:5173
```

The backend API runs at:

```text
http://localhost:3001
```

## Installation Without Docker

You need Node.js, npm, and MySQL installed.

1. Create a MySQL database:

```sql
CREATE DATABASE investment_portal;
```

2. Copy the environment file:

```bash
cp .env.example .env
```

3. Update `.env` with your MySQL username and password.

4. Install and start the backend:

```bash
cd backend
npm install
npm run seed
npm run dev
```

5. Install and start the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

6. Open:

```text
http://localhost:5173
```

## Demo Flow For Presentation

1. Start on the home page and explain the multi-tier design: React frontend, Express web server, MySQL database.
2. Log in as `alice` with `password123`.
3. Show that Alice only sees her own investments.
4. Log out.
5. Log in as `erin` with `employee123`.
6. Show that Erin can see all investment rows because she is an employee.
7. Click "Connect MetaMask" and approve the wallet connection in MetaMask.
8. Explain that the wallet address is sent to the backend and saved through Sequelize.
9. Mention Docker Compose runs the same services locally that could be deployed to an AWS EC2 Ubuntu instance.

See [docs/demo-script.md](docs/demo-script.md) for a short speaking script.

## API Overview

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/auth/login` | Validate credentials and create a session |
| POST | `/api/auth/logout` | Destroy the session |
| GET | `/api/auth/me` | Return the current session user |
| GET | `/api/investments` | Return investments based on user role |
| POST | `/api/wallet` | Save the connected Ethereum wallet address |
| GET | `/api/health` | Health check for AWS/load balancer checks |

## Session Management

HTTP is stateless, so the backend uses `express-session`. After login, the server stores user data in the session and sends an HTTP-only cookie to the browser. The browser sends that cookie on future requests, allowing the server to identify the logged-in user and protect the investments route.

## AWS Deployment Notes

For AWS, create an Ubuntu EC2 instance, open HTTP port 80 and SSH port 22, install Docker, copy this repository to the server, configure `.env`, and run `docker compose up --build -d`. More details are in [docs/aws-deployment.md](docs/aws-deployment.md).

## GitHub Submission Instructions

```bash
git init
git add .
git commit -m "Final project cloud crypto investment portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cloud-crypto-investment-portal.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username and create the empty repository on GitHub first.

