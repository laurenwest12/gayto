const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('./db/seed');
const { Cast, Ceremony } = require('./db/models/index');

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'))
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
);

//cast api

app.get('/api/cast', (req, res, next) => {
  Cast.findAll()
    .then(cast => res.send(cast))
    .catch(next);
});

app.put('/api/cast/:id', (req, res, next) => {
  Cast.findByPk(req.params.id)
    .then(cast => cast.update(req.body))
    .then(cast => res.json(cast))
    .catch(next);
});

app.put('/api/cast', (req, res, next) => {
  req.body.map(member => {
    Cast.findByPk(member.id)
      .then(castMember => castMember.update(member))
      .then(cast => res.json(cast))
      .catch(next);
  });
});

//ceremony api

app.get('/api/ceremonies', (req, res, next) => {
  Ceremony.findAll()
    .then(ceremony => res.send(ceremony))
    .catch(next);
});

app.get('/api/ceremonies/:number', (req, res, next) => {
  Ceremony.findAll({
    where: {
      number: req.params.number
    }
  })
    .then(ceremony => res.send(ceremony))
    .catch(next);
});

app.use(express.static(path.join(__dirname, '..', 'public')));

syncAndSeed().then(() =>
  app.listen(port, () => console.log(`listening on port ${port}`))
);
