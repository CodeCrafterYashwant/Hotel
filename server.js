const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const logRequest = (req,res,next) =>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();
};  
app.use(logRequest); 




app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

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


