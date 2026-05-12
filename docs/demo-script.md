# Five Minute Demo Script

## Opening

"My final project is a cloud-ready crypto investment portal. It uses a React frontend, an Express web server, Sequelize as the ORM, MySQL for storage, Docker for deployment, and server-side session management. I also added MetaMask so a user can connect an Ethereum wallet."

## Show Architecture

"The browser runs the React app. React calls the Express API. Express validates the login, creates a session, and uses Sequelize to read and write MySQL records. Docker Compose runs the frontend, backend, and database as separate services, which matches a multi-tier client-server design."

## Customer Login

1. Log in as `alice` / `password123`.
2. Point to the login status message.
3. Open the investment table.

"Alice is a customer, so the server only returns Alice's investment record. The filtering is not only in the browser. It happens in the protected backend route using the session user."

## Employee Login

1. Log out.
2. Log in as `erin` / `employee123`.
3. Show all investment rows.

"Erin is an employee, so the same page now shows every customer. This demonstrates role-based access."

## MetaMask

1. Click Connect MetaMask.
2. Approve the wallet if MetaMask is available.

"MetaMask gives the app an Ethereum wallet address. The frontend sends that address to Express, and Sequelize saves it in the MySQL users table."

## AWS Closing

"For AWS, this project can be moved to an Ubuntu EC2 instance. The AWS guide opens HTTP port 80, installs Docker, and runs the same containers in the cloud. That demonstrates the cloud migration part of the course."

