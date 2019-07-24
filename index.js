// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({success: false, err});
    })
});


server.get('/api/users/:id', (req, res) => {
  const {id} = req.params;
  db.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({success: false, err});
    })
})



server.listen(4000, () => {
  console.log('Server listening on port 4000');
});

