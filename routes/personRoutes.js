const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')


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
router.get('/', async (req,res)=>{
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
router.get('/:worktype',async (req,res)=>{
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
router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators: true
        });
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('Data updated');
        res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error.'})
    }
})


//delete by id
router.delete('/:id', async (req,res)=>{
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