
const validateRequest = (schema) =>{
    return (req, res, next) =>{
        let { error }= schema.validate(req.body);
        if(error){
            return res.status(400).json({error})
        }
        next();
    }
}

module.exports = {
    validateRequest
}