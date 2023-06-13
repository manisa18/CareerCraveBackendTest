const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const UserResponse = require("../models/userResModel");
const Test = require("../models/testModel");

exports.userResponse = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id;
  const { testId, answers } = req.body;

  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    let score = 0;
    for (const question of test.questions) {
      const correctAnswers = question.answers
        .filter((answer) => answer.isCorrect)
        .map((answer) => answer.answerId);
      const userAnswers = answers
        .filter((answer) => answer.questionID === question.questionID)
        .map((answer) => answer.answerId);

      if (
        correctAnswers.length === userAnswers.length &&
        correctAnswers.every((answer) => userAnswers.includes(answer))
      ) {
        score += 1;
      }
    }
    const userResponse = new UserResponse({
      userId: userId,
      testID: testId,
      answers: answers,
      score: score,
    });
    await userResponse.save();
    res.status(200).json({
      userId: userId,
      testId: testId,
      score: score,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandler("Internal Server Error"), 500);
  }
});
