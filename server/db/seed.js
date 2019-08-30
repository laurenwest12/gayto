const { Cast, Ceremony, TruthBooth, Pair } = require('./models');
const db = require('./db');

const syncAndSeed = () => {
  return db.sync({ force: true }).then(() => {
    return Promise.all([
      Cast.create({ id: 1, name: 'Alex' }),
      Cast.create({ id: 2, name: 'Annie' }),
      Cast.create({ id: 3, name: 'Brandon' }),
      Cast.create({ id: 4, name: 'Conor' }),
      Cast.create({ id: 5, name: 'Dan' }),
      Cast.create({ id: 6, name: 'Doug' }),
      Cast.create({ id: 7, name: 'Eli' }),
      Cast.create({ id: 8, name: 'Emily' }),
      Cast.create({ id: 9, name: 'Irene' }),
      Cast.create({ id: 10, name: 'John' }),
      Cast.create({ id: 11, name: 'Julie' }),
      Cast.create({ id: 12, name: 'Kailee' }),
      Cast.create({ id: 13, name: 'Lauren' }),
      Cast.create({ id: 14, name: 'Lia' }),
      Cast.create({ id: 15, name: 'Shannon' }),
      Cast.create({ id: 16, name: 'Travis' }),
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
