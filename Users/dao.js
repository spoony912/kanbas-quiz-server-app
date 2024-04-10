// Implement CRUD operations
//DAO implement an interface between an application and the low level database acess
import model from "./model.js";

// create new user
export const createUser = (user) => {
    delete user._id;
    return model.create(user);
}

// retrieve all users
export const findAllUsers = () => model.find();

// retrieve a single user by id
export const findUserById = (userId) => model.findById(userId);

// retrieve a single user by username
export const findUserByUsername = (username)=> model.findOne({username: username});

// retrieve a single user by credentials
export const findUserByCredentials = (username, password) => model.findOne({username, password});

// update user
export const updateUser = (userId, user) => model.updateOne({_id: userId}, {$set:user});

// delete user
export const deleteUser = (userId) => model.deleteOne({_id:userId});

export const findUserByRole= (role) => model.find({role:role});




