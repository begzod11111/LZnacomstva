import mongoose from 'mongoose';

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

const GoalMeeting = mongoose.model('GoalMeeting', goalMeetingSchema);

export default GoalMeeting;