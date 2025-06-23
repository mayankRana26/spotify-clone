import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id }); // ✅ fixed spelling

    if (!user) {
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });

      return res.status(200).json({ success: true, message: "New user created" });
    }

    return res.status(200).json({ success: true, message: "User already exists" });
  } catch (error) {
    console.log("❌ Error in the auth callback:", error);
    next(error);
  }
};
