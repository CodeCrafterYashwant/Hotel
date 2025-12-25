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

personSchema.pre('save', async function() {
    const person = this;

    if(!person.isModified('password')) return;

    try{
        const salt = await bcrypt.genSalt(10);

        const hassedpassword = await bcrypt.hash(person.password, salt);

        person.password = hassedpassword;
        
    }catch(error){
        throw error;
    }
});

personSchema.methods.comparePassword = async function(candidatepassword){
    try{
        const ismatch = await bcrypt.compare(candidatepassword, this.password);
        return ismatch;
    }catch(error){
        throw error;
    }
};


const Person = mongoose.model('Person', personSchema);
module.exports = Person;