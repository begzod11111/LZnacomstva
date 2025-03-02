import mongoose from 'mongoose';
import {Dir, getPath} from "../config/constants.js";
import {referenceModelsArray} from "../config/constants.js";

const imageSchema = new mongoose.Schema({
  isMain: {
    type: Boolean,
    default: false
  },
  _referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  _referenceModel: {
    type: String,
    required: true,
    enum: referenceModelsArray
  },
  file: {
    type: Object,
    required: true
  },
  url: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
});

imageSchema.pre('findOneAndUpdate', function(next) {
    try {
      const update = this.getUpdate()
      if (update.file) {
        update.url = getPath(update.file.path);
      }
      this.setUpdate(update)
      next();
    } catch (e) {
      next(e);
    }
});

imageSchema.virtual('reference', {
  ref: doc => doc._referenceModel,
  localField: '_referenceId',
  foreignField: '_id',
  justOne: true
});

imageSchema.pre('save', function(next) {
    if (!this.url) {
        this.url = getPath(this.file.path);
    }
    next();
})

imageSchema.pre('deleteMany', async function(next) {
    const { _referenceId, _referenceModel } = this.getFilter();
    if (!_referenceId || !_referenceModel) {
        next(new Error('No reference id or model provided'));
    }
    const dir = new Dir(_referenceModel, _referenceId);
    await dir.delete()
    next()
})

const Image = mongoose.model('Image', imageSchema);

export default Image;