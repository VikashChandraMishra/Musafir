const connectToMongo = require('./db.js');

connectToMongo();

require("dotenv").config();
const cors = require('cors');
const express = require('express');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/logs', require('./routes/logs'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.listen(port, () => {
    console.log(`Musafir API listening on port ${port}`);
})