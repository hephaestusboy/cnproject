const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
const settingsRouter = require('./routes/settings');
const chatRouter = require('./routes/chat');

app.use('/api/settings', settingsRouter);
app.use('/api/chat', chatRouter);

// Serve the HTML files
app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/settings.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/chat.html'));
});

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});