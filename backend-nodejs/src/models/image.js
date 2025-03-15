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

imageSchema.pre('findOneAndUpdate', async function(next) {
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


imageSchema.pre('save', async function(next) {
    if (!this.url) {
        this.url = getPath(this.file.path);
    }
    if (!this._referenceId || !referenceModelsArray.includes(this._referenceModel)) {
        next(new Error('Reference model not found'));
    } else {
        const referenceModel = mongoose.model(this._referenceModel);
        if (this._referenceModel === 'User') {
            await referenceModel.findById(this._referenceId).select('_id').populate({
                path: 'images',
                select: '_id isMain',
            }).exec()
                .then(doc => {
                    if (!doc) {
                        next(new Error('Reference not found'));
                    }
                    if (doc.images.length === 5) {
                        next(new Error('You can not upload more than 5 images'));
                    } else if (doc.images.length === 0) {
                        this.isMain = true
                    }
                    next();
                })
                .catch(e => {
                    next(e);
                });
        } else if (this._referenceModel === 'Country') {
            const country = await referenceModel.findById(this._referenceId)
                .select('_id').populate({
                    path: 'image',
                    select: '_id',
                }).exec();
        }
    }
    next();
})

imageSchema.pre('deleteMany', async function(next) {
    const { _referenceId, _referenceModel } = this.getFilter();
    const dir = new Dir(_referenceModel, _referenceId);
    await dir.delete()
    next()
})

const Image = mongoose.model('Image', imageSchema);

export default Image;