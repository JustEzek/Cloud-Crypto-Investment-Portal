# AWS Deployment Guide

This project matches the course AWS flow: move the laptop project to an AWS Ubuntu instance, open HTTP access, install the required software, and run the web application from the cloud.

## 1. Create EC2 Instance

1. Open AWS EC2.
2. Launch a new Ubuntu Server instance.
3. Use a free-tier instance type if available.
4. Create or choose a key pair.
5. Security group rules:
   - SSH port 22 from your IP address.
   - HTTP port 80 from anywhere.
   - Optional demo ports 3001 and 5173 from your IP only.

## 2. Install Docker On Ubuntu

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin git
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ubuntu
```

Log out and back in so the docker group takes effect.

## 3. Upload Or Clone The Project

```bash
git clone https://github.com/YOUR_USERNAME/cloud-crypto-investment-portal.git
cd cloud-crypto-investment-portal
cp .env.example .env
```

Edit `.env` and set a strong `SESSION_SECRET`.

## 4. Start The Cloud App

```bash
docker compose up --build -d
docker compose exec backend npm run seed
```

Open:

```text
http://YOUR_EC2_PUBLIC_IP
```

If presenting directly from Docker Compose, port 5173 maps the frontend. For production, you can route port 80 through nginx or change the compose port mapping to `80:80`.

## 5. Cloud Concepts To Mention

- Scalability: the web server and frontend can be copied to larger or multiple instances.
- Elasticity: AWS can add or remove compute resources as demand changes.
- Resilience: the app can be backed up, redeployed, and placed behind a load balancer.
- Security: sessions use HTTP-only cookies, and AWS security groups control network access.

