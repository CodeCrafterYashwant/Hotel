const Person = require('./models/Person');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;






passport.use(new LocalStrategy(async (USERNAME,PASSWORD,done)=>{
    try{
        // console.log("Credentials Received.",USERNAME,PASSWORD);
        const user = await Person.findOne({username:USERNAME});
        if(!user){
            return done(null,false,{message: 'Incorrect Username.'});
        }
        // ... inside LocalStrategy ...
// CHANGE THIS LINE:
const isPasswordMatch = await user.comparePass(PASSWORD); 
// (It was missing 'await' previously)
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message: 'Incorrect Password'});
        }
        
    }catch(error){
        return done(error);
    }   
}));

module.exports = passport;