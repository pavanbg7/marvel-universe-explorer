require('dotenv').config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(express.json());

// Sessions = how the server "remembers" who's logged in across requests
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// REGISTER
app.post('/api/register', async (req, res) => {
  try {
    const { username, phonenumber, email, password } = req.body;
    const newUser = new User({ username, phonenumber, email, password });
    await newUser.save(); // bcrypt hook runs automatically here
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password' });

    req.session.userId = user._id; // mark this browser as "logged in"
    res.json({ message: 'Login successful', username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

// CHECK CURRENT SESSION
app.get('/api/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }

  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(401).json({ error: 'User not found' });

    res.json({ username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGOUT
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out' });
  });
});

startServer();