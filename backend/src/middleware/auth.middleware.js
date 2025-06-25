// ✅ Clerk v5+ Compatible
import { getAuth, clerkClient } from "@clerk/express";

// 🔐 Protect Route
export const protectRoute = (req, res, next) => {
  const auth = getAuth(req); // ✅ new way (req.auth is deprecated)
  if (!auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.userId = auth.userId; // ✅ save it for later use
  next();
};

// 🛡️ Require Admin
export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.userId); // ✅ correct Clerk SDK function
    const email = currentUser.primaryEmailAddress?.emailAddress;

    const isAdmin = email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase(); // ✅ safe match

    if (!isAdmin) {
      return res.status(401).json({ message: "Unauthorized admin" });
    }

    next();
  } catch (error) {
    console.error("❌ Error in requireAdmin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
