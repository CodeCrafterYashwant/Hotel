const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.get('/',function(req,res){
    res.send("Welcome to our Hotel"); 
})


const personRoutes = require('./routes/personRoutes');
const menuitemRoutes = require('./routes/menuitemRoutes');

 

app.use('/person',personRoutes);
app.use('/menu',menuitemRoutes);

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{
    console.log("listing on port:",PORT);
})


