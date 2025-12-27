const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) =>{
    const token = req.header.authorization.spilit(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized.'});
    try{
        jwt.verify(token,process.env.JWT_SECRET)
    }
}