const { Cast, Ceremony, Match, TruthBooth } = require('./models');
const db = require('./db');

const syncAndSeed = () => {
  return db.sync({ force: true }).then(() => {
    return Promise.all([Cast.create({ name: '1' })]);
  });
};

module.exports = syncAndSeed;
