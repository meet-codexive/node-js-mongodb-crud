import { Router } from "express";
import { addstud, deletestud, getstud, getstudById, updatestud } from "../controller/studController";

const router = Router();

router.post("/add-data", addstud)
router.put("/update-data/:id", updatestud)
router.delete("/delete-data/:id", deletestud)
router.get("/get-data", getstud)
router.get("/get-data-by/:id", getstudById)

export default router