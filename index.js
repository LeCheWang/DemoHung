require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const { jobRemoveProduct } = require('./helpers/cron');

jobRemoveProduct.start();

const connectDB = require('./configs/database');
const routers = require('./routers');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.static('uploads'));

//để client gửi dữ liệu dạng json
// và server nhận được
app.use(express.json());

app.get('/chat', (req, res) => {
  res.render('chat');
});

// Connect to the database
connectDB();
routers(app);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  let room = "";

  socket.on('join_room', (data) => {
    socket.join(data);
    room = data;
    console.log(`User joined room: ${room}`);
  });

  socket.on('send_message', (message) => { 
    io.to(room).emit("receive_message", message);
  });
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

//MVC: Model, View, Controller, api, client-server,
