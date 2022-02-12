import { Router } from "express";
import { demoadd, demodelete, demoget, demogetdata, demoupdate } from "../controller/demoCpntroller";
import { login } from "../controller/loginController";
import { customerget, customerpost, identifier } from "../controller/onetoOneController";
import { productdelete, productget, productgetsingle, store, update } from "../controller/productController";
import { register } from "../controller/registerController";
import { me } from "../controller/userController";
import { admin } from "../middelware/admin";
import { auth } from "../middelware/auth";

const router = Router();

router.post("/register", register)
router.post("/login", login)
router.get("/me", auth, me)
// router.get("/logout", auth, logout)
router.post("/add", [auth, admin], store)
router.put("/update/:id", update)
router.delete("/delete/:id", productdelete)
router.get("/get", productget)
router.get("/getsingle/:id", productgetsingle)


router.post("/demoadd", demoadd)
router.put("/demoupdate/:id", demoupdate)
router.delete("/demodelete/:id", demodelete)
router.get("/demoget", demoget)
router.get("/demogetdata/:id", demogetdata)

//one to one relationship
router.post("/customer", customerpost)
router.get("/customerget", customerget)
router.post("/identifier", identifier)
export default router