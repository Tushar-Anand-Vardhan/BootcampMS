const authorizedRoles =(...roles)=>{
    return ((req,res,next)=>{

        if(!roles.includes(req.user.role)){
            res.status(403).json({
                success:false,
                message:"You are not allowed to access this resource"
            })
            
        }
        next();
        
    })
}

module.exports = authorizedRoles