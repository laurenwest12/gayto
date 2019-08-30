const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('./db/seed');
const { Cast, Ceremony, Pair, TruthBooth } = require('./db/models/index');

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
    .then(cast => res.json(cast))
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
    .then(ceremony => res.json(ceremony))
    .catch(next);
});

app.get('/api/ceremonies/:number', (req, res, next) => {
  Ceremony.findAll({
    where: {
      number: req.params.number
    }
  })
    .then(ceremony => res.json(ceremony))
    .catch(next);
});

app.put(`/api/ceremonies/:number`, (req, res, next) => {
  Ceremony.findByPk(req.params.number)
    .then(ceremony => ceremony.update(req.body))
    .then(ceremony => res.json(ceremony))
    .catch(next);
});

//pairs
app.get('/api/ceremonies/:number/pairs', (req, res, next) => {
  Pair.findAll({
    where: {
      ceremonyId: req.params.number
    }
  })
    .then(pair => res.json(pair))
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
    .then(pair => res.json(pair))
    .catch(next);
});

//truth booth

app.get(`/api/truthbooths/:number`, (req, res, next) => {
  TruthBooth.findByPk(req.params.number)
    .then(tb => res.json(tb))
    .catch(next);
});

app.get(`/api/truthbooths/:number/pairs`, (req, res, next) => {
  const { number, pair1, pair2 } = req.body;
  Pair.findAll({
    where: {
      truthBoothId: req.params.number
    }
  })
    .then(pair => res.json(pair))
    .catch(next);
});

app.post(`/api/truthbooths/:number/pairs`, (req, res, next) => {
  const { number, pair1, pair2, match } = req.body;
  Pair.create({
    pair1,
    pair2,
    truthBoothId: number,
    match
  })
    .then(pair => res.json(pair))
    .catch(next);
});

app.put(`/api/truthbooths/:number/`, (req, res, next) => {
  const { number, match } = req.body;
  TruthBooth.findByPk(number)
    .then(tb => tb.update({ match }))
    .then(tb => res.json(tb))
    .catch(next);
});

//truth booths

app.use(express.static(path.join(__dirname, '..', 'public')));

syncAndSeed().then(() =>
  app.listen(port, () => console.log(`listening on port ${port}`))
);
