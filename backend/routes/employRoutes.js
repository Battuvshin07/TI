import express from "express";

import { list, create ,update , remove, changePassword} from "../controller/employController.js";

const router = express.Router();

router.get("/list", list);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/delete/:id", remove);
router.put("/changePassword/:id", changePassword);


export default router;
