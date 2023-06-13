const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  testID: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionID: {
        type: String,
        required: true,
      },
      questionText: {
        type: String,
        required: true,
      },
      answers: [
        {
          answerId: {
            type: String,
            required: true,
          },
          answerText: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Test", testSchema);
