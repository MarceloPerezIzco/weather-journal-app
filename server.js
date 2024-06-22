// Require Express and Cors
const express = require("express");
const cors = require("cors");

// Start up an instance of app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// GET route
app.get("/all", (req, res) => {
    res.send(projectData);
});

// POST route
app.post("/add", (req, res) => {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    res.send(projectData);
});
