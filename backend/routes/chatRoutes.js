import express from "express";
import { isLoggedIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/",isLoggedIn, accessChatController);
// router.get("/", isLoggedIn, fetchChatsController);
// router.post("/group",isLoggedIn, createGroupChatController);
// router.put("/rename",isLoggedIn, renameGroupController);
// router.delete("/group-remove",isLoggedIn,removeFromGroupController);
// router.delete("/group-add",isLoggedIn,addToGroupController);

export default router;
