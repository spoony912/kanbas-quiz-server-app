import db from "../Database/index.js";

function AssignmentRoutes(app) {

    // retrieve: get
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const {cid} = req.params;
        const assignments = db.assignments.filter((a)=> a.course === cid);
        res.send(assignments);
    });

    // create
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const {cid} = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    //delete
    app.delete("/api/courses/:cid/assignments",(req,res)=>{
        const {cid} = req.params;
        db.assignments = db.assignments.filter( (a) => a.course !== cid);
        res.sendStatus(200);  
    });
    
    //update
    app.put("/api/courses/:cid/assignments/:aid", (req, res)=>{

        const {aid} = req.params;
        const assignmentIndex = db.assignments.findIndex((a)=> a.id === aid);

        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body,
        };
        res.sendStatus(204);

    });

}
export default AssignmentRoutes;
