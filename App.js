import express from "express";
import Hello from './Hello.js';
import Lab5 from './Lab5.js';
import cors from "cors";
import session from "express-session";
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import mongoose from "mongoose";

import UserRoutes from './Users/routes.js';
import "dotenv/config";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/Kanbas';
const DB_NAME = process.env.DB_NAME || 'Kanbas';
mongoose.connect( CONNECTION_STRING, {dbName: DB_NAME});


const app = express();

// app.use(session({
//   secret: 'jydu',  
//   saveUninitialized: false, 
//   resave: false,            
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 
//   }
// }));

app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    
  }));

const sessionOptions = {

  secret:'jydu',
  resave:false,
  saveUninitialized:false,
};

if (process.env.NODE_ENV !=="development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite:"none",
    secure:"true",
    domain:process.env.HTTP_SERVER_DOMAIN,
  };

}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000)
