const { Cast, Ceremony, TruthBooth } = require('./models');
const db = require('./db');

const syncAndSeed = () => {
  return db.sync({ force: true }).then(() => {
    return Promise.all([
      Cast.create({ name: '1' }),
      Cast.create({ name: '2' }),
      Cast.create({ name: '3' }),
      Cast.create({ name: '4' }),
      Cast.create({ name: '5' }),
      Cast.create({ name: '6' })
    ]).then(() => {});
  });
};

module.exports = syncAndSeed;
