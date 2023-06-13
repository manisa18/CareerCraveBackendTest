const mongoose = require("mongoose");

const useResSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  testID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  questionID: [
    {
      type: String,
      required: true,
    },
  ],
  answers: [
    {
      answerId: {
        type: String,
        required: true,
      },
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("UserResponse", useResSchema);
