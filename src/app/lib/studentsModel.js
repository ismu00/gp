// app/lib/studentsModel.js
import mongoose from 'mongoose';

const StudentsModel = new mongoose.Schema({
  name: String,
  room: String,
  className: String
});

// ✅ Use "default" export and correct model check
export default mongoose.models.Students || mongoose.model('Students', StudentsModel);
