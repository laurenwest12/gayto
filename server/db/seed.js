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
      Ceremony.create({ id: 3, number: 3 }),
      Ceremony.create({ id: 4, number: 4 }),
      Ceremony.create({ id: 5, number: 5 }),
      Ceremony.create({ id: 6, number: 6 }),
      Ceremony.create({ id: 7, number: 7 }),
      Ceremony.create({ id: 8, number: 8 }),
      Ceremony.create({ id: 9, number: 9 }),
      Ceremony.create({ id: 10, number: 10 }),
      TruthBooth.create({ id: 1, number: 1 }),
      TruthBooth.create({ id: 2, number: 2 }),
      TruthBooth.create({ id: 3, number: 3 }),
      TruthBooth.create({ id: 4, number: 4 }),
      TruthBooth.create({ id: 5, number: 5 }),
      TruthBooth.create({ id: 6, number: 6 }),
      TruthBooth.create({ id: 7, number: 7 }),
      TruthBooth.create({ id: 8, number: 8 }),
      TruthBooth.create({ id: 9, number: 9 }),
      TruthBooth.create({ id: 10, number: 10 })
    ]).then(() => {});
  });
};

module.exports = syncAndSeed;
