import * as express from "express";
import { validateUser } from "../authentication/authenticate";
const router = express.Router();
import * as usersController from "./user.handler";

router.get("", validateUser, usersController.getAll);
router.post("/register", usersController.register);
router.post("/login", usersController.login);

export { router as usersRouter };
