const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
    },
    work:{
        type: String,
        enum:['chef','manager','waiter'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    },
    salary: {
        type: Number,
        required: true
    },
    username:{
        type: String,
        required:true
    },
    password:{
        required:true,
        type: String
    }
});

// FIX 1: Removed 'next' parameter. Do not call next() in async functions.
personSchema.pre('save', async function () {
    const person = this;

    // If password hasn't been modified, return early
    if(!person.isModified('password')) return;

    try{
        // FIX 2: Added 'await' to genSalt (crucial!)
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hassedpassword = await bcrypt.hash(person.password, salt);

        person.password = hassedpassword;
        
        // AUTOMATIC COMPLETION: No next() needed here.
        
    }catch(error){
        // FIX 3: Just throw the error, don't use next(error)
        throw error;
    }
});

// FIX 4: Changed 'method' to 'methods' (plural is required)
personSchema.methods.comparePass = async function(candidatepassword){
    try{
        const ismatch = await bcrypt.compare(candidatepassword, this.password);
        return ismatch;
    }catch(error){
        throw error;
    }
} 

const Person = mongoose.model('Person', personSchema);
module.exports = Person;