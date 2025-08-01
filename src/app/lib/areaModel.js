// app/lib/studentsModel.js
import mongoose from 'mongoose';

const AreasModel = new mongoose.Schema({
  place: String,
  noPerson: Number,
  category: String
});

// ✅ Use "default" export and correct model check
export default mongoose.models.Areas || mongoose.model('Areas', AreasModel);
