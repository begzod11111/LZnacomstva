'use strict';
const { Model, DataTypes } = require('sequelize');
const slugify = require('slugify');

module.exports = (sequelize) => {
  class Country extends Model {
    static associate(models) {
      // define association here
    }

    getAbsoluteUrl() {
      return `${process.env.BASE_URL}/countries/${this.slug}`;
    }
  }
  Country.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      primaryKey: true,
      unique: true
    },
    flag: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Country',
    hooks: {
      beforeSave: (country, options) => {
        if (!country.slug) {
          country.slug = slugify(country.name, { lower: true, strict: true });
        }
      }
    }
  });

  return Country;
};