// app/lib/studentsModel.js
import mongoose from 'mongoose';

const AreasModel = new mongoose.Schema({
  place: String,
  noPerson: Number,
  category: String
});

export default mongoose.models.Areas || mongoose.model('Areas', AreasModel);
