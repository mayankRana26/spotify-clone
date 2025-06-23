import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId){
         console.log("🔒 Auth Middleware Check:", req.auth);
        return res.status(401).json({message:"Unauthorized from middleware- you should login first"});
    }
    next();
};


export const requireAdmin = async(req, res, next) => {
    try {
        const currentUser= await clerkClient.users.get(req.auth.userId);
        const isAdmin=process.env.ADMIN_EMAIL ===currentUser.primaryEmailAddress?.emailAddress;

        if(!isAdmin){
            return res.status(401).json({message:"Unauthorized admin- you should login first"});
        }
        next();
    } catch (error) {
        next(error);
    }
}