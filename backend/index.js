const connectToMongo = require('./db.js');

connectToMongo();

require("dotenv").config();
const cors = require('cors');
const express = require('express');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // To accesss req.body 
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/notes', require('./routes/posts'));

app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.listen(port, () => {
    console.log(`Musafir API listening on port ${port}`);
})