import express from "express";

const app = express();
const PORT = 3000;

/* Server listening message */
app.listen(PORT, () => {
  console.log("I'm listening, talk to me");
});

/* HOME ROUTE - HTML response (green text) */
app.get("/home", (req, res) => {
  res.send(`
    <h1 style="color: green;">
      Welcome to the Home Page
    </h1>
  `);
});

/* ABOUT ROUTE - Plain text */
app.get("/about", (req, res) => {
  res.send("This is the about page of our Express application.");
});

/* STUDENT ROUTE - Params + Query */
app.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params;
  const { department } = req.query;

  res.json({
    studentId: studentId,
    department: department || "Not specified",
    status: "Active"
  });
});
