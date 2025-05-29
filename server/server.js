const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors'); // ✅ Add this
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const chatRoutes = require('./routes/chat');
const notificationRoutes = require('./routes/notification');
const studentRoutes = require('./routes/studentRoutes');  // <-- Add here

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use CORS before any routes
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/student', studentRoutes);  // <-- Add here

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

// Database connection and server start
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB Connected');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => console.error(err));
