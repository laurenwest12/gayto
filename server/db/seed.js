const { Cast, Ceremony, TruthBooth, Pair } = require('./models');
const db = require('./db');

const syncAndSeed = () => {
  return db.sync({ force: true }).then(() => {
    return Promise.all([
      Cast.create({
        id: 1,
        name: 'Alex',
        imgUrl: 'https://i.imgur.com/i3X6K4p.jpg'
      }),
      Cast.create({
        id: 2,
        name: 'Annie',
        imgUrl: 'https://i.imgur.com/tF8a6P3.jpg'
      }),
      Cast.create({
        id: 3,
        name: 'Barbara',
        imgUrl: 'https://i.imgur.com/k8mDplm.jpg'
      }),
      Cast.create({
        id: 4,
        name: 'Brandon',
        imgUrl: 'https://i.imgur.com/WN7KGW1.jpg'
      }),
      Cast.create({
        id: 5,
        name: 'Conor',
        imgUrl: 'https://i.imgur.com/UzILALO.jpg'
      }),
      Cast.create({
        id: 6,
        name: 'Dan',
        imgUrl: 'https://i.imgur.com/tAt30E0.jpg'
      }),
      Cast.create({
        id: 7,
        name: 'Doug',
        imgUrl: 'https://i.imgur.com/DTD95Gx.jpg'
      }),
      Cast.create({
        id: 8,
        name: 'Eli',
        imgUrl: 'https://i.imgur.com/EdFpQRi.jpg'
      }),
      Cast.create({
        id: 9,
        name: 'Emily',
        imgUrl: 'https://i.imgur.com/lsXhfwY.jpg'
      }),
      Cast.create({
        id: 10,
        name: 'Irene',
        imgUrl: 'https://i.imgur.com/OBvssna.jpg'
      }),
      Cast.create({
        id: 11,
        name: 'John',
        imgUrl: 'https://i.imgur.com/f6G11MK.jpg'
      }),
      Cast.create({
        id: 12,
        name: 'Julie',
        imgUrl: 'https://i.imgur.com/ZP4Bq57.jpg'
      }),
      Cast.create({
        id: 13,
        name: 'Kailee',
        imgUrl: 'https://i.imgur.com/Isv7EaS.jpg'
      }),
      Cast.create({
        id: 14,
        name: 'Lauren',
        imgUrl: 'https://i.imgur.com/Bn0TrZO.jpg'
      }),
      Cast.create({
        id: 15,
        name: 'Lia',
        imgUrl: 'https://i.imgur.com/9OBwmRF.jpg'
      }),
      Cast.create({
        id: 16,
        name: 'Travis',
        imgUrl: 'https://i.imgur.com/h7OMVul.jpg'
      }),
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
