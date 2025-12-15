const express = require('express');
const router = express.Router();
const Menuitem = require('../models/Menuitem');


router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new Menuitem(data);
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.get('/', async (req,res)=>{
    try{
        const data = await Menuitem.find();
        console.log('data featched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error.'});
    }
});
router.get('/:taste', async (req,res)=>{
    const tastetype  = req.params.taste;
    try{
        if(tastetype == 'Sweet' || tastetype == 'Spicy' || tastetype == 'Sour'){
            const response = await Menuitem.find({taste: tastetype});
            console.log('Response Fetched.');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid work type.'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server Error.'});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const menuID = req.params.id;
        const UpdatedMenu = req.body;
        const response = await Menuitem.findByIdAndUpdate(menuID,UpdatedMenu,{
            new :true,
            runValidators: true
        });
        if(!response){
            res.status(404).json({error: 'Menu Item not found'});
        }
        console.log("Menu Updated.");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error.'});
    }
})

router.delete('/:id',async (req,res)=>{
    const menuID = req.params.id;
    try{
        const response = await Menuitem.findByIdAndDelete(menuID);
        if(!response){
            res.status(404).json({error: 'Menu Item not found'});
        }
        console.log('Menu Item Deleted.');
        res.status(200).json({message: 'Menu Item Deleted Successfully.'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error.'})
    }
})

module.exports = router;