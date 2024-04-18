import db from "../Database/index.js"

function QuizRoutes(app) {

  // retrieve: get
  app.get("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const quizzes = db.quizzes.filter((q) => q.course === cid);
    res.send(quizzes);
  });

  // create
  app.post("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const newQuiz = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.quizzes.push(newQuiz);
    res.send(newQuiz);
  });
 
  //delete
  app.delete("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    db.quizzes = db.quizzes.filter((q) => q.course !== cid);
    res.sendStatus(200);
  });
 
  //update
  app.put("/api/courses/:cid/quizzes/:qid", (req, res) => {
    const { qid } = req.params;
    const quizIndex = db.quizzes.findIndex(
      (q) => q._id === qid);
    db.quizzes[quizIndex] = {
      ...db.quizzes[quizIndex],
      ...req.body
    };
    res.sendStatus(204);
  });
}
 
export default QuizRoutes;