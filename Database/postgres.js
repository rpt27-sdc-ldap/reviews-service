const config = require('../config.js');
const { Sequelize } = require('sequelize');
const pgtools = require("pgtools");
const sequelize = new Sequelize(config.postgresURL + config.dbName, {logging: false});
const models = require('./databaseHelpers/postgresModels')(sequelize);
const db = {};

db.addReviewer = async (reviewer) => {
  return models.Reviewer.create(reviewer)
  .catch(console.error);
}

db.bulkInsert = async (reviews) => {
  return models.Review.bulkCreate(reviews, {fields: [
    'bookId', 'review', 'reviewTitle', 'date',
    'overallStars', 'performanceStars', 'storyStars',
    'foundHelpful','reviewerId', 'sourceId', 'locationId'
  ]}).then(res => {
    return reviews.length;
  }).catch(err => {
    console.error(err);
    return 0;
  })
}

db.create = async (review) => {

}

db.read = async (bookId, reviewerId) => {
  let query = `
    select r.id, "bookId", r."reviewerId", "name" as "reviewerName", "urlString", "review", "reviewTitle", "date", "overallStars", "performanceStars","storyStars","foundHelpful","source","location"
    from "Reviews" r, "Locations" l, "Sources" s, "Reviewers" rs
    where r."locationId" = l."id" AND r."sourceId" = s."id"  AND r."reviewerId" = rs."id" AND r."bookId" = ${parseInt(bookId)}
  `
  if (reviewerId !== undefined) {
    query += ` AND r."reviewerId" = ${parseInt(reviewerId)}`
  }
  return await sequelize.query(query).then(results => {
    if (reviewerId !== undefined) {
      return results[0][0];
    }
    return results[1].rows;
  })
}


db.update = async (bookId, reviewerId, review) => {

}

db.delete = async (bookId, reviewerId) => {
  if (reviewerId === undefined || bookId === undefined) {
    throw new Error('Not specific enough');
  }
  return models.Review.destroy({
    where: {
      bookId: parseInt(bookId),
      reviewerId: parseInt(reviewerId)
    }
  }).then(code => {
    return {deleted: code === 1}
  })
}

db.handler = (req, res, query) => {
  query.then(data => {
    if (data === null) {
      res.sendStatus(404);
    } else {
      res.json(data);
    }
  })
  .catch(err => {
    res.sendStatus(500);
    console.error(err);
  });
}

//////SEEDING STUFF

db.init = async () => {
  await pgtools.createdb(config.postgresURL, config.dbName)
  .catch(error => {
    console.error('Error: ',error?.pgErr?.message);
  })
  .finally(async res => {
    await sequelize.sync({force: true}).then(async res => {
      console.log('Models Synchronized');
    }).catch(err => {
      console.log('Models not Synchronized');
      console.error(err);
    })
    await models.Source.bulkCreate([
      {id: 1, source: 'Amazon'},
      {id: 2, source: 'Audible'}
    ]);
    await models.Location.bulkCreate([
      {id: 1, location: 'Canada'},
      {id: 2, location: 'United States'}
    ]);

  });
}

db.done = async () => {
  console.log('Seeding finished');
}

module.exports = db;