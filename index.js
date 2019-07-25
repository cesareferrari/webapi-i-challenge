// implement your API here
const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

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
});


server.post('/api/users', (req, res) => {
  const user = req.body;

  if (user && user.name && user.bio) {
    db.insert(user)
      .then(user => {
        res.status(201).json({success: true, user});
      })
      .catch(err => {
        res.status(500).json({error: "There was an error while saving the user to the database"});
      })
  } else {
    res.status(400).json({errorMessage: "Please provide name and bio for the user."})
  }

});

server.delete('/api/users/:id', (req, res) => {
  const {id} = req.params;

  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({success: false, message: 'I cannot find the user'});
      }
    })
    .catch(err => {
      res.status(500).json({success: false, err});
    })
});

server.put('/api/users/:id', (req, res) => {
  const {id} = req.params;
  const user = req.body;
  console.log(user);

  db.update(id, user)
    .then(updated => {
      if (updated) {
        res.status(200).json({success: true, updated});
      } else {
        res.status(404).json({success: false, message: "I cannot find the user"})
      }
    })
    .catch(err => {
      res.status(500).json({success: false, err});
    })
});


server.listen(4000, () => {
  console.log('Server listening on port 4000');
});

