import express from "express";

import { list } from "../controller/reportController.js";

const router = express.Router();

router.route("/list").get(list);

export default router;
