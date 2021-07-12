const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Reviewer = sequelize.define('Reviewer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  const Review = sequelize.define('Review', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.STRING(2500),
      allowNull: false
    },
    reviewTitle: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    overallStars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    performanceStars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    storyStars: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    foundHelpful: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  const Source = sequelize.define('Source', {
    source: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  const Location = sequelize.define('Location', {
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Reviewer.hasMany(Review, {foreignKey: 'reviewerId'});
  Source.hasMany(Review, {foreignKey: 'sourceId'});
  Location.hasMany(Review, {foreignKey: 'locationId'});

  return {Reviewer, Review, Source, Location}
}
