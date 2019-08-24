const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('./db/seed');
const { Cast, Match } = require('./db/models/index');

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'))
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
);

app.get('/api/cast', (req, res, next) => {
  Cast.findAll()
    .then(cast => res.send(cast))
    .catch(next);
});

app.put('/api/cast/:id', (req, res, next) => {
  console.log(req.body);
  Cast.findByPk(req.params.id)
    .then(cast => cast.update(req.body))
    .then(cast => res.json(cast))
    .catch(next);
});

app.get('/api/matches', (req, res, next) => {
  Match.findAll()
    .then(match => res.send(match))
    .catch(next);
});

app.use(express.static(path.join(__dirname, '..', 'public')));

syncAndSeed().then(() =>
  app.listen(port, () => console.log(`listening on port ${port}`))
);
