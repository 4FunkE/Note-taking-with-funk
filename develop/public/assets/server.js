const express = require("express");//import express
const fs = require("fs");//import fs to read and write files
const { v4: uuid4 } = require("uuid");//importing the v4 property from uuid named it uuid4
const path = require("path");//import path to create file paths

const app = express();//create a variable to use express (web building frameswork)
const PORT = process.env.PORT || 3000; //the port linked it .env or 3000

//GET for read file and return
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db.json'), "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read the funking notes...' });
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
  });

// POST update a new note add to file and return it
app.post('/api/reviews', (req, res) => {
    //readfile
    fs.readFile(path.join(__dirname, "db.json"), "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to read the funking notes...' });
        } 
        const notes = JSON.parse(data); // Convert string into JSON object
        const newNote = { id: uuidv4(), title, text };
        notes.push(newNote);//// Add a new note
    //writefile
    fs.writeFile(path.join(__dirname, 'db.json'), JSON.stringify(notes), (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to save note' });
        }
        res.json(newNote);
        });
    });
});