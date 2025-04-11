require('dotenv').config();
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const xssDetector = require('./detector/xssDetector');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Keep track of all connected dashboard clients
let dashboardClients = [];

wss.on('connection', (ws) => {
  console.log('⚡ New WebSocket connection established');
  dashboardClients.push(ws);

  ws.on('close', () => {
    dashboardClients = dashboardClients.filter(client => client !== ws);
    console.log('⚠️ WebSocket connection closed');
  });
});

// Endpoint: Send suspicious input for analysis
app.post('/api/scan', (req, res) => {
  const { input, ip } = req.body;

  const result = xssDetector(input);
  const log = logger(input, ip || '127.0.0.1', result);

  // Broadcast to all connected WebSocket clients
  dashboardClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(log));
    }
  });

  res.json({ success: true, log });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
