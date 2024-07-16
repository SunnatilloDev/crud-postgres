import { Router } from "express";
import userController from "../controllers/user.controller";
import validateData from "../middlewares/validate.middleware";
import { userScheme } from "../schemes";

let router = Router();

router.get("/", userController.getUsers);
router.post("/", validateData(userScheme), userController.postUser);
router.get("/:id", userController.getOneUser);
router.put("/:id", userController.putUser);
router.delete("/:id", userController.deleteUser);

export default router;
