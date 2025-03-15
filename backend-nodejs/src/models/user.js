import mongoose from 'mongoose';
import Gender from "./gender.js";
import Image from "./image.js";
import {getDefaultAvatarPath} from "../config/constants.js";
import gender from "./gender.js";


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
    required: false,
    default: 0
  },
  weight: {
    type: Number,
    required: false,
    default: 0,
  },
  aboutMe: {
    type: String,
    required: false,
    default: 'Not Answer'
  }
});

userSchema.virtual('images', {
  ref: Image,
  localField: '_id',
  foreignField: '_referenceId'
});

userSchema.virtual('gender', {
  ref: 'Gender',
  localField: 'genderId',
  foreignField: '_id',
  justOne: true
})

userSchema.virtual('country', {
  ref: 'Country',
  localField: 'countryId',
  foreignField: '_id',
  justOne: true
})

userSchema.virtual('goalMeeting', {
    ref: 'GoalMeeting',
    localField: 'goalMeetingId',
    foreignField: '_id',
    justOne: true
})

userSchema.pre('findOneAndDelete', async function () {
  try {
    await Image.deleteMany({ _referenceId: this._conditions._id, _referenceModel: this.model.modelName });
  } catch (e) {
    console.error(e);
  }
})
userSchema.methods.getImages = function() {
  if (this.images.length === 0) {
    return [
      {
        url: getDefaultAvatarPath(),
        isMain: true,
        _id: 'default'
      }
    ];
  } else return this.images;
}
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

userSchema.methods.get_avatar =  function() {
  if (this.images.length > 0) {
    return this.images[0].url;
  } else {
    return getDefaultAvatarPath();
  }
}

userSchema.methods.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
}

userSchema.methods.get_gender =  function() {
  if (gender) {
    return this.genderId;
  }
}

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
