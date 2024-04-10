//Middle tier: interact with user interface and the DAOs to talk to the database

import * as dao from "./dao.js";
let currentUser = null;
let globalCurrentuser = null;

export default function UserRoutes(app) {

    const createUser = async (req, res) => { 
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const deleteUser = async (req, res) => { 
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
     };

    const findAllUsers = async (req, res) => { 
        const {role} = req.query;
        if (role) {
            const users = await dao.findUserByRole(role);
            res.json(users);
            return;
        }
        const users = await dao.findAllUsers();
        res.json(users);
     };

    const findUserById = async (req, res) => { 
        const userId = req.params.userId;
        const user = await dao.findUserById(userId);
        res.send(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
     };
    const register = async (req, res) => { 
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json({ message: "Username already taken" });
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        globalCurrentuser = currentUser;
        res.json(currentUser);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            globalCurrentuser = currentUser;
            res.json(currentUser);
        } else {
            res.status(401).send("Invalid credentials");
        }
     };
    const signout = async (req, res) => {
        req.session.destroy();
        currentUser = null;
        res.send("Signed out");
     };
    const profile = async (req, res) => { 
        let currentUser = req.session["currentUser"];
        currentUser = globalCurrentuser;
        if (!currentUser) {
            res.status(401);
            return;
        }
        res.json(currentUser);
     };
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/register", register);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);



    // const createUser = async(req, res) => {
    //     const user = await dao.createUser(req.body);
    //     res.json(user);
    // };
    // const deleteUser = async(req, res) => {
    //     const status = await dao.deleteUser(req.params.userId);
    //     res.json(status);
    // };
    // const updateUser = async(req, res)=>{
    //     const { userId } = req.params;
    //     const status = await dao.updateUser(userId, req.body);
    //     const currentUser = await dao.findUserById(userId);
    //     req.session['currentUser'] = currentUser;
    //     res.json(status);
    // };

    // app.get("/api/users", async(req, res)=> {
    //     const users = await dao.findAllUsers();
    //     res.json(users);
    // });
    // app.get("/api/users/:userId", async(req, res)=>{
    //     const userId = req.params.userId;
    //     const user = await dao.findUserById(userId);
    //     res.send(user);
    // });
    // app.post("api/users", createUser);
    // app.put("/api/users/:userId", updateUser);
    // app.delete("/api/users/:userId", deleteUser);

    // app.post("/api/users/register", async(req, res)=>{
    //     const{username, password} = req.body;
    //     const existingUser = await dao.findUserByUsername(username);
    //     if(existingUser){
    //         res.status(400).json({message:"Usernname already taken"});
    //     }
    //     try{
    //         const currentUser = await dao.createUser({username, password});
    //         req.session["currentUser"] = currentUser;
    //         globalCurrentuser = currentUser;
    //         res.json(currentUser);
    //     }catch(e){
    //         console.log("Error creating user");
    //     }
    // });
    // app.post("/api/users/signin", async(req, res)=>{
    //     const {username, password} = req.body;
    //     const currentUser = await dao.findUserByCredentials(username, password);
    //     if (currentUser) {
    //         req.session["currentUser"] = currentUser;
    //         globalCurrentuser = currentUser;
    //         res.json(currentUser);
    //     } else{
    //         res.status(401).send("Invalid credentials");
    //     }
    // });
    // app.post("/api/users/signout", async(req, res)=>{
    //     req.session.destroy();
    //     res.send("Signed out");
    // }) ;
    // app.post("/api/users/profile", async (req, res) => {
    //     let currentUser = req.session["currentUser"];
    //     currentUser = globalCurrentuser;
    //     if(!currentUser){
    //         res.status(401).send("Not logged in");
    //         return;
    //     }
    //     res.json(currentUser);
    // });

}