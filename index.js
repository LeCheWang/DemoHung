require('dotenv').config();
const express = require('express');

const app = express();

const connectDB = require('./configs/database');
const routers = require('./routers');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

//để client gửi dữ liệu dạng json
// và server nhận được
app.use(express.json());

// Connect to the database
connectDB();
routers(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

//MVC: Model, View, Controller, api, client-server,
