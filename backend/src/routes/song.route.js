import { Router } from "express";
import { getAllSongs } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import { getFeaturedSongs, getForYouSongs, getTrendingSongs } from "../controller/song.controller.js";

const router = Router();

router.get("/", protectRoute,requireAdmin,getAllSongs);
router.get("/featured",getFeaturedSongs);
router.get("/made-for-you",getForYouSongs);
router.get("/trending",getTrendingSongs);



export default router;