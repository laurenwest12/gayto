const { Cast, Ceremony, TruthBooth, Pair } = require('./models');
const db = require('./db');

const syncAndSeed = () => {
  return db.sync({ force: true }).then(() => {
    return Promise.all([
      Cast.create({ id: 1, name: '1' }),
      Cast.create({ id: 2, name: '2' }),
      Cast.create({ id: 3, name: '3' }),
      Cast.create({ id: 4, name: '4' }),
      Cast.create({ id: 5, name: '5' }),
      Cast.create({ id: 6, name: '6' }),
      Ceremony.create({ id: 1, number: 1 }),
      Ceremony.create({ id: 2, number: 2 }),
      Ceremony.create({ id: 3, number: 3 })
    ]).then(() => {});
  });
};

module.exports = syncAndSeed;
