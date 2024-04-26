import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/route.js";
import AssignmentRoutes from "./Kanbas/assignments/route.js";
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import QuizRoutes from "./Kanbas/courses/quiz/routes.js";
// mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas";

const DB_NAME = process.env.DB_NAME || "kanbas";

// mongoose.connect(CONNECTION_STRING, { dbName: DB_NAME });
mongoose
  .connect(CONNECTION_STRING, { dbName: DB_NAME })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
const app = express();

// session
// const sessionOptions = {
//   secret: "any string",
//   resave: false,
//   saveUninitialized: false,
// };
const sessionOptions = {
  //   secret: process.env.SESSION_SECRET,
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
app.use(express.json());
//cors
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
  })
);
// all component
Hello(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
UserRoutes(app);
Lab5(app);
QuizRoutes(app);

app.listen(process.env.PORT || 4000);
