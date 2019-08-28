const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('./db/seed');
const { Cast, Ceremony, Pair } = require('./db/models/index');

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

//pairs
app.get('/api/ceremonies/:number/pairs', (req, res, next) => {
  Pair.findAll({
    where: {
      ceremonyId: req.params.number
    }
  })
    .then(pair => res.send(pair))
    .catch(next);
});

app.post(`/api/ceremonies/:number/pairs`, (req, res, next) => {
  const { number, pair1, pair2 } = req.body;
  let match;

  pair1.matchId === pair2.id ? (match = true) : (match = false);

  Pair.create({
    number,
    pair1,
    pair2,
    match,
    ceremonyId: number
  })
    .then(pair => res.send(pair))
    .catch(next);
});

app.use(express.static(path.join(__dirname, '..', 'public')));

syncAndSeed().then(() =>
  app.listen(port, () => console.log(`listening on port ${port}`))
);
