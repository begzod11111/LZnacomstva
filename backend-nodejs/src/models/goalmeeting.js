import mongoose from 'mongoose';
import slugify from "slugify";

const goalMeetingSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: false
  },
  name: {
    type: String,
    unique: true,
    required: true
  }
});

goalMeetingSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'goalMeetingId'
});

goalMeetingSchema.pre('save', async function(next) {
    if (!this.slug) {
      this.slug = slugify(this.name, { lower: true });
    }
    next();
});
const GoalMeeting = mongoose.model('GoalMeeting', goalMeetingSchema);

export default GoalMeeting;