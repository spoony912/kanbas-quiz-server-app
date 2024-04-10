// The functions provided by Mongoose models are deliberately generic 
// because they can interact with any collection configured in the schema

import mongoose from "mongoose";
import userSchema from "./schema.js";
const model = mongoose.model("UserModel", userSchema);
export default model;