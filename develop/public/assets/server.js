const express = require("express");//import express
const fs = require("fs");//import fs to read and write files
const { v4: uuid4 } = require("uuid");//importing the v4 property from uuid named it uuid4
const path = require("path");//import path to create file paths

const app = express();//create a variable to use express (web building frameswork)
const PORT = process.env.PORT || 3000; //the port linked it .env or 3000