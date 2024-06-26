import model from "./model.js";

// Create a new quiz
export const createQuiz = (courseId, quiz) => {
  quiz.courseId = courseId;
  return model.create(quiz);
};

// Retrieve all quizzes
export const findAllQuizzes = () => {
  return model.find();
};

// Retrieve a quiz by its ID
export const findQuizById = (quizId) => {
  return model.findById(quizId);
};

// Update a quiz
export const updateQuiz = (quizId, quiz) => {
  return model.updateOne({ _id: quizId }, { $set: quiz });
};

// Delete a quiz
export const deleteQuiz = (quizId) => {
  return model.deleteOne({ _id: quizId });
};

// Retrieve quizzes by course ID
export const findQuizzesByCourse = (courseId) => {
  return model.find({ course: courseId });
};

// ？？？
export const findQuizzesByAuthor = (author) => {
  return model.find({ author: author });
};

//  add question
export const addQuestionToQuiz = async (quizId, question) => {
  return model.findByIdAndUpdate(
    quizId,
    { $push: { questions: question } },
    { new: true } // Return the updated document
  );
};

// find question
export const findQuestionByQuizId = async (quizId) => {
  return model.findById(quizId);
};

// export const findQuizByType = (quizType) => model.find({ quizType: quizType });
// export const findQuestionByType = (quizQuestionType, courseId, quizId) => {
//   return model.find({
//     "questions.questionType": quizQuestionType, // Adjust the path to questionType if necessary
//     course: courseId,
//     _id: quizId,
//   });
// };
export const findQuestionByType = (quizQuestionType, courseId, quizId) => {
  return model.findOne({
    _id: quizId,
    course: courseId,
    "questions.questionType": quizQuestionType,
  });
};
