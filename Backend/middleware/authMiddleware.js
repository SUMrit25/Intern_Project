import jwt from "jsonwebtoken"

const isLoggedin = async(req, res, next)=>{
    const {token} = req.cookies
     if(!token){
        return res.status(400).json({message:"No Token found"})
     }
     try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(400).json({message:"Invalid Token"})
        }

        req.user = decoded
        next();
     } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
     }
}

export {isLoggedin}