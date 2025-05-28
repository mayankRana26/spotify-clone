import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    if(!req.auth.userId){
        return res.status(401).json({mnessage:"Unauthorized- you should login first"});
    }
    next();
};


export const requireAdmin = async(req, res, next) => {
    try {
        const currentUser= await clerkClient.users.get(req.auth.userId);
        const isAdmin=process.env.ADMIN_EMAIL ===currentUser.primaryEmailAddress?.emailAddress;

        if(!isAdmin){
            return res.status(401).json({mnessage:"Unauthorized- you should login first"});
        }
        next();
    } catch (error) {
        next(error);
    }
}