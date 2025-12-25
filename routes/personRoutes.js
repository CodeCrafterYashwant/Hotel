const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')
const passport = require('../auth');
const localAuthMiddleware = passport.authenticate('local',{session:false});


//simple post request
router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})


//simple get request
router.get('/',localAuthMiddleware, async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('data featched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error.'})
    }
})

//get by work
router.get('/:worktype',localAuthMiddleware,async (req,res)=>{
    const worktype = req.params.worktype;
    try{
        if(worktype == 'chef' || worktype == 'manager' || worktype == 'waiter'){
            const response = await Person.find({work: worktype});
            console.log('response fetched');
            res.status(200).json(response);
    
        }else{
            res.status(404).json({error:'Invalid work type.'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error.'});
    }
})


//put by id
// personRoutes.js

router.put('/:id',localAuthMiddleware, async (req, res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        // 1. Find the person specifically
        const person = await Person.findById(personId);

        if(!person){
            return res.status(404).json({error: 'Person not found'});
        }

        // 2. Manually update the fields provided in the body
        // Object.keys creates an array of the keys in updatedPersonData
        Object.keys(updatedPersonData).forEach(key => {
            person[key] = updatedPersonData[key];
        });

        // 3. Save the person. 
        // This triggers the pre('save') hook in Person.js, hashing the password if it changed.
        const response = await person.save();

        console.log('Data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error.'})
    }
})

//delete by id
router.delete('/:id',localAuthMiddleware, async (req,res)=>{
    const personId = req.params.id;
    try{
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error: 'Person not found'});
        }
        console.log('Data deleted.');
        res.status(200).json({message: "Person Successfully Deleted."})
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error.'})
    }
})


module.exports = router;