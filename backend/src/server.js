const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '../.env') });
require('dotenv').config();

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const investmentRoutes = require('./routes/investments');
const walletRoutes = require('./routes/wallet');

const app = express();
const port = Number(process.env.PORT || 3001);
const oneDay = 1000 * 60 * 60 * 24;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'development-secret-change-me',
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      secure: process.env.SESSION_COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: oneDay
    }
  })
);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'investment-portal-api' });
});

app.get('/', (req, res) => {
  res.json({
    service: 'Cloud Crypto Investment Portal API',
    status: 'running',
    frontend: 'http://localhost:5173',
    health: '/api/health'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/wallet', walletRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: 'Server error. Please try again.' });
});

async function start() {
  await sequelize.authenticate();
  await sequelize.sync();
  app.listen(port, () => {
    console.log(`API server running on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Unable to start server:', error);
  process.exit(1);
});
