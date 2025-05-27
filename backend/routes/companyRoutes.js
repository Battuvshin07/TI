import express from "express";

import { list } from "../controller/companyController.js";
import { create } from "../controller/companyController.js";
import { update } from "../controller/companyController.js";

const router = express.Router();

router.route("/list").get(list);
router.route("/create").post(create);
router.route("/update/:id").put(update);

export default router;
