import mongoose from "mongoose";

// Schema describe the structure of the data stored in the database and it's used to 
// validate the data being stored of modified through the Mongoose library.

const userShema = new mongoose.Schema({
    username: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role:{
        type: String,
        enum: ['STUDENT', 'FACULTY', 'ADMIN', 'USER'],
        default: 'USER',},
    },
    {collection:"users"});

export default userShema ;