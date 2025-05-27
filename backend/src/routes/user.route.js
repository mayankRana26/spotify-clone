import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    req.auth.userId
    res.send("user routes");
});

export default router;