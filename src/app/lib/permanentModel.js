// app/lib/studentsModel.js
import mongoose from 'mongoose';

const PermanentModel = new mongoose.Schema({
  place: String,
  noPerson: Number,
  cleaner: [String],
  category: String
});

export default mongoose.models.Permanents || mongoose.model('Permanents', PermanentModel);
