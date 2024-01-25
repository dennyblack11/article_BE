import { Router } from "express";
import { createUser, viewAllUsers } from "../controller/userController";

const router: Router = Router();

router.route("/register").post(createUser);
router.route("/get-users").get(viewAllUsers);
export default router;
