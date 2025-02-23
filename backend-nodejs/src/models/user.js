import mongoose from 'mongoose';
import Gender from "./gender.js";
import Image from "./image.js";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  goalMeetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GoalMeeting',
    required: false
  },
  genderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gender',
    required: false
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: false
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  age: {
    type: Number,
    required: false
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  eyeColor: {
    type: String,
    enum: ['Not Answer', 'Blue', 'Black', 'White'],
    default: 'Not Answer',
    required: true
  },
  hairColor: {
    type: String,
    enum: ['Not Answer', 'Blue', 'Black', 'White'],
    default: 'Not Answer',
    required: true
  },
  height: {
    type: Number,
    required: false
  },
  weight: {
    type: Number,
    required: false
  },
  aboutMe: {
    type: String,
    required: false
  }
});

userSchema.virtual('images', {
  ref: Image,
  localField: '_id',
  foreignField: '_referenceId'
});


userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.getAge = function() {
  if (this.dateOfBirth) {
    const nowDate = new Date();
    const age = nowDate - new Date(this.dateOfBirth);
    return Math.floor(age / (1000 * 60 * 60 * 24 * 365));
  }
  return null;
};

userSchema.pre('save', async function(next) {
  if (this.dateOfBirth) this.age = this.getAge();
  try {
    if (!this.genderId) {
      const genderId = await Gender.findOne({name: 'male'});
      this.genderId = genderId._id;
    }
  } catch (e) {return next(e)}
  next();
})

const User = mongoose.model('User', userSchema);

export default User;
