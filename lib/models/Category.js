
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
  },
});

export default mongoose.model('Category', CategorySchema);
