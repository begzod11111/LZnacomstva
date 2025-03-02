import mongoose from 'mongoose';
import slugify from 'slugify';
import {models} from "../config/database.js";

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return v && v.trim().length > 0;
      },
      message: 'Name cannot be empty'
    }
  },
  slug: {
    type: String,
    default: function() {
      return slugify(this.name, { lower: true });
    }
  },

});

countrySchema.methods.get_url_media = function() {
  return this.image ? this.image.url : null;
}

countrySchema.virtual('image', {
  ref: 'Image',
  localField: '_id',
  foreignField: '_referenceId',
  justOne: true
});

countrySchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'countryId',
    justOne: false
});



countrySchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

countrySchema.pre('findOneAndDelete', async function(next) {
  const image = await models.image.findOne({ _referenceId: this._conditions._id });
  next();
});
countrySchema.statics.associate = function(models) {
  this.hasMany(models.User, {
    foreignKey: 'countryId',
    as: 'users'
  });
};

const Country = mongoose.model('Country', countrySchema);

export default Country;
