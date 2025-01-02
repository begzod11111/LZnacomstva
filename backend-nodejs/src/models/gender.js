import mongoose from 'mongoose';
import slugify from 'slugify';

const genderSchema = new mongoose.Schema({
  slug: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true
  }
});

genderSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

genderSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'genderId'
});

const Gender = mongoose.model('Gender', genderSchema);

export default Gender;