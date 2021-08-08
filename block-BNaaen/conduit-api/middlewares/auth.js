const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
module.exports = {
    verifyToken: async(req,res,next)=>{
        console.log(token)
        try{
            if(token) {
                const payload = await jwt.verify(token, process.env.SECRET)
                console.log({payload})
                req.user = payload
                next()
            } else{
                res.status(400).json({error: 'You are not logged in, please login'})
            }
        }catch(e){
            next(e)
        }
    },
    slug: function(str){
        return str
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\W-]+/g, "")
            .concat(Math.floor(Math.random()*1000))
    },
    hash: async function(password){
        try{
            const hashed = await bcrypt.hash(password, 10)
        }catch(e){
            res.status(400).send(e)
        }
    }
}









