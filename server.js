const express = require("express");//import express
const fs = require("fs");//import fs to read and write files
const { v4: uuidv4 } = require("uuid");//importing the v4 property from uuid named it uuid4
const path = require("path");//import path to create file paths

const app = express();//create a variable to use express (web building frameswork)
const PORT = process.env.PORT || 3000; //the port linked it .env or 3000

// Middleware to parse JSON request bodies
app.use(express.json());
// Serve static files from the "view" directory
app.use(express.static('view'));
//for the uuid
app.use(express.urlencoded({ extended: true }));

//GET read file, and return
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '/db/db.json'), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read the funking notes...' });
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
  });

// POST update a new note, add to file, and return it
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (!title || !text) {
      return res.status(400).json({ error: 'For Funks sake, you need a title and text.' });
    }
    //readfile
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to read the funking notes...' });
        } 
        const notes = JSON.parse(data); // Convert string into JSON object
        const newNote = { id: uuidv4(), title, text };
        notes.push(newNote);//// Add a new note
    //writefile
    fs.writeFile(path.join(__dirname, '/db/db.json'), JSON.stringify(notes), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to save note -Funk' });
        }
        res.json(newNote);
        });
    });
});

//shows the notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/view/notes.html'));
});

//shows the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/view/index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Funking Server is listening at http://localhost:${PORT}`);
  });