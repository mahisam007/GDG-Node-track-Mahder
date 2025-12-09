
const express = require("express");
const app = express();

app.use(express.json());

let students = [];
let nextId = 1;


app.get("/students", (req, res) => {
    res.json(students);
});


app.post("/students", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const newStudent = { id: nextId++, name };
    students.push(newStudent);

    res.json(newStudent);
});


app.put("/students/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const student = students.find((s) => s.id == id);

    if (!student) {
        return res.status(404).json({ error: "Student not found" });
    }

    student.name = name;
    res.json(student);
});


app.delete("/students/:id", (req, res) => {
    const { id } = req.params;

    const index = students.findIndex((s) => s.id == id);

    if (index === -1) {
        return res.status(404).json({ error: "Student not found" });
    }

    students.splice(index, 1);

    res.json({ message: "Student deleted successfully" });
});

app.listen(4000, () => {
    console.log("Student API server running on port 4000");
});
