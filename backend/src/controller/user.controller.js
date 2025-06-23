import {User} from "../models/user.model.js";

export const getAllUsers =async (req, res, next) => {
    try {
        const currentUserId=req.auth.userId;
        console.log("✅ Authenticated userId:", req.auth.userId);
        const users=await User.find();
        console.log("📦 Users in DB:", users.length);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}