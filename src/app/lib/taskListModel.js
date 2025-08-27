// app/lib/studentsModel.js
import mongoose from 'mongoose';

const taskListModel = new mongoose.Schema({
   taskName: String,
   status: Boolean,
  date: String,
  description: String,
  cleaningList: [
    {
      place: String,
      category: String,
      noPerson: Number,
      cleaner: [String],
    },
  ],
  leftover: [String],
  leaders: [Array]
});

// ✅ Use "default" export and correct model check
export default mongoose.models.TaskLists || mongoose.model('TaskLists', taskListModel);
