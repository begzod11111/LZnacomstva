import mongoose from 'mongoose';
import slugify from 'slugify';

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
  file: {
    type: Object,
    required: true
  },
  flag: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Flag must be a valid URL'
    }
  },
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

countrySchema.statics.associate = function(models) {
  this.hasMany(models.User, {
    foreignKey: 'countryId',
    as: 'users'
  });
};

const Country = mongoose.model('Country', countrySchema);

export default Country;
