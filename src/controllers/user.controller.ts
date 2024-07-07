import { Request, Response } from "express";
import userService from "../services/user.service";
import extraService from "../services/extra.service";
import { IUser } from "../../types";

class userController {
    async postUser(req: Request, res: Response): Promise<void> {
        try {
            let user: IUser = req.body;
            let isValid = extraService.checkValidBody(user, [
                "first_name",
                "last_name",
                "email",
                "salary",
            ]);
            if (!isValid) {
                res.status(400).send({
                    message: "All fields required",
                });
                return;
            }
            let createdUser = await userService.createUser(user);
            res.send({
                message: "User created",
                user: createdUser,
            });
        } catch (error: any) {
            res.status(500).send({
                message: error.message,
            });
        }
    }
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            let users: IUser[] = await userService.getUsers();
            res.send(users);
        } catch (error: any) {
            res.status(500).send({
                message: error.message,
            });
        }
    }
    async getOneUser(req: Request, res: Response) {
        try {
            let { id } = req.params;
            let user = await userService.getOneUser(id);
            if (!user) {
                res.status(404).send({
                    message: "User not found",
                });
                return;
            }
            res.status(200).send(user);
        } catch (error: any) {
            res.status(500).send({
                message: error.message,
            });
        }
    }
    async putUser(req: Request, res: Response) {
        try {
            let updatingData = req.body;
            let { id } = req.params;
            let updatedUser = await userService.updateUser(updatingData, id);
            if (!updatedUser) {
                res.status(404).send({
                    message: "User not found",
                });
                return;
            }
            res.send({
                message: "User updated",
                updatedUser,
            });
        } catch (error: any) {
            res.status(500).send({
                message: error.message,
            });
        }
    }
    async deleteUser(req: Request, res: Response) {
        try {
            let { id } = req.params;
            await userService.deleteUser(id);
            res.status(200).send({
                message: "Deleted",
            });
        } catch (err: any) {
            res.status(500).send({
                message: err.message,
            });
        }
    }
}

export default new userController();
