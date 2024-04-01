const assignment = {
    id: 1, 
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due:"2024-04-01", 
    completed:false, 
    score: 100
};
const module = {
    id:"MD101",
    name:"Introduction to Web Dev",
    description:"This module provides an introduction to Web Development",
    course: "CS5610"
}
const todos = [
    {id: 1, title: "NodeJS Assignment", description: "Create a NodeJS server with ExpressJS", due: "2021-09-09", completed: false},
    {id: 2, title :"Task 2", description: "Task 2 about the assignment", due: "2021-09-09", completed: true},
    {id: 3, title :"Task 3", description: "Task 3 about the assignment", due: "2021-09-09", completed: false},
    {id: 4, title :"Task 4", description: "Task 4 about the assignment", due: "2021-09-09", completed: true},
];

const Lab5 = (app) => {
    app.get("/a5/welcome", (req, res)=>{
        res.send("Welcome to Assignment 5");
    } );

// ------------Calculate Part ------------------------    
    app.get("/a5/add/:a/:b", (req, res)=> {
        const {a,b} = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
      });
    app.get("/a5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) * parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) / parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/calculator", (req, res) => {
        const {a,b,operation} = req.query;
        let result = 0;
        switch(operation){
            case "add":
                result = parseInt(a) + parseInt(b);
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            case "multiply":
                result = parseInt(a) * parseInt(b);
                break;
            case "divide":
                result = parseInt(a) / parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());
    });

// ------------ Assignment Part --------------    
    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const {newTitle} = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    app.get("/a5/assignment/score", (req, res) => {
        res.json(assignment.score);
    });
    app.get("/a5/assignment/score/:newScore",(req,res)=> {
        const {newScore} = req.params;
        assignment.score = newScore;
        res.json(assignment);
    });
    app.get("/a5/assignment/completed", (req, res) => {
        res.json(assignment.completed);
    });
    app.get("/a5/assignment/completed/:isCompleted",(req,res)=> {
        const {isCompleted} = req.params;
        assignment.completed = isCompleted;
        res.json(assignment);
    });

// ------------Module Part ------------    
    app.get("/a5/module",(req, res) => {
        res.json(module);
    });
    app.get("/a5/module/name",(req,res) => {
        res.json(module.name);
    });
    app.get("/a5/module/name/:newName", (req, res)=>{
        const {newName} = req.params;
        module.name = newName;
        res.json(module);
    });
    app.get("/a5/module/description",(req,res) => {
        res.json(module.description);
    });
    app.get("/a5/module/description/:newDescription", (req, res) => {
        const {newDescription} = req.params;
        module.description = newDescription;
        res.json(module);
    });
    
// ------------Todo Part ------------    


    // create new todos
    // using post method
    app.post("/a5/todos", (req, res) => {
        const newTodo = {
            ...req.body,
            id: new Date().getTime()
        };
        todos.push(newTodo);
        res.json(newTodo);
    });
    // using get method
    app.get("/a5/todos", (req, res) =>{
        res.json(todos);
    });

    app.get("/a5/todos/create", (req, res) => {
        const newTodo = {
            id: new Date().getTime(),
            title:"New Task",
            description: "New todo description",
            due: "2021-09-09",
            completed: false
        };
        todos.push(newTodo);
        res.json(todos);
    })

    // get todo by id
    app.get("/a5/todos/:id", (req, res)=> {
        const {id} = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        res.json(todo);
    });

    // get completed = true todos
    app.get("/a5/todos", (req, res) => {
        const { completed } = req.query;
        if (completed !== undefined) {
          const completedTodos = todos.filter((t) => t.completed === (completed === "true"));
          res.json(completedTodos);
          return;
        }
        res.json(todos);
      });

      // delete todo by id
      app.delete("/a5/todos/:id", (req, res) => {
        const {id} = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if(!todo) {
            res.status(404).json({
                message:`Unable to delete Todo with ID ${id}`
            });
            return;
        }
        todos.splice(todos.indexOf(todo),1);
        res.sendStatus(200);
      });

      app.get("/a5/todos/:id/delete", (req, res) =>{
        const {id} = req.params;
        const todo = todos.find( (t) => t.id === parseInt(id));
        const todoIndex = todos.indexOf(todo);
        if (todoIndex !== -1){
            todos.splice(todoIndex, 1);
        }
        res.json(todos);
      });

      // update todo's title
      app.get("/a5/todos/:id/title/:title", (req, res)=>{
        const{id, title} = req.params;
        const todo = todos.find( (t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
      });

      // update todo's description
      app.get("/a5/todos/:id/description/:description", (req, res)=>{
        const{id, description} = req.params;
        const todo = todos.find( (t) => t.id === parseInt(id));
        todo.description = description;
        res.json(todos);
      });

      // update todo's completed status
      app.get("/a5/todos/:id/completed/:completed", (req, res)=>{
        const{id, completed} = req.params;
        const todo = todos.find( (t) => t.id === parseInt(id));
        todo.completed = completed === "true";
        res.json(todos);
      });

      //put method
      app.put("/a5/todos/:id", (req, res) => {
          const {id} = req.params;
          const todo = todos.find((t) => t.id === parseInt(id));
          if (!todo) {
              res.status(404).json({
                  message:`Unable to update Todo with ID ${id}`
              });
              return;
          }
          todo.title = req.body.title;
          todo.description = req.body.description;
          todo.due = req.body.due;
          todo.completed = req.body.completed;
          res.sendStatus(200);
        })
};
export default Lab5;