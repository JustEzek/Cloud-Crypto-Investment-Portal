const bcrypt = require('bcryptjs');
const { sequelize, User, Investment } = require('../models');

const users = [
  {
    userid: 'alice',
    password: 'password123',
    name: 'Alice Rivera',
    email: 'alice@example.com',
    zipcode: '07001',
    role: 'Customer',
    investment: { usdBalance: 12500.75, btcBalance: 0.245, ethBalance: 3.5, eurBalance: 9100.25, riskLevel: 'Medium' }
  },
  {
    userid: 'bob',
    password: 'password123',
    name: 'Bob Chen',
    email: 'bob@example.com',
    zipcode: '10001',
    role: 'Customer',
    investment: { usdBalance: 6400.0, btcBalance: 0.08, ethBalance: 1.2, eurBalance: 4200.0, riskLevel: 'Low' }
  },
  {
    userid: 'erin',
    password: 'employee123',
    name: 'Erin Patel',
    email: 'erin@example.com',
    zipcode: '07302',
    role: 'Employee',
    investment: { usdBalance: 2000.0, btcBalance: 0.03, ethBalance: 0.75, eurBalance: 1500.0, riskLevel: 'Low' }
  },
  {
    userid: 'admin',
    password: 'admin123',
    name: 'Admin User',
    email: 'admin@example.com',
    zipcode: '00000',
    role: 'Admin',
    investment: { usdBalance: 0, btcBalance: 0, ethBalance: 0, eurBalance: 0, riskLevel: 'Low' }
  }
];

async function seed() {
  await sequelize.sync({ force: true });

  for (const item of users) {
    const passwordHash = await bcrypt.hash(item.password, 10);
    const user = await User.create({
      userid: item.userid,
      passwordHash,
      name: item.name,
      email: item.email,
      zipcode: item.zipcode,
      role: item.role
    });
    await Investment.create({ ...item.investment, user_id: user.id });
  }

  console.log('Database seeded with demo users and investments.');
  await sequelize.close();
}

seed().catch(async (error) => {
  console.error(error);
  await sequelize.close();
  process.exit(1);
});

