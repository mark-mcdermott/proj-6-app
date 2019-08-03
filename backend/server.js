const express = require('express');
const connection = require('./secret');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get(`/`, (req, res) => {
    res.status(200).send('HELLO YOU !');
});

connection.connect();

app.post(`/registerTeam`, (req, res) => {
    const { teamName } = req.body;
    if (!teamName) return;
    connection.query(`INSERT INTO Team (TeamName) VALUES (?);`, teamName, err => {
        if (err) throw err;
        console.log(`${teamName} INSERTED`);
    });
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`Server is listening on ${port}`);
});
