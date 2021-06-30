import * as express from "express";
const router = express.Router();
import * as usersController from "./user.controller";

router.get("", usersController.getAll);

export { router as usersRouter };
