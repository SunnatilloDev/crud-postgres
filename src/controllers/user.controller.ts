import { Request, Response } from "express";
import userService from "../services/user.service";
import { IUser } from "../../types";

class userController {
    async postUser(req: Request, res: Response): Promise<void> {
        try {
            let user: IUser = req.body;
            let createdUser = await userService.createUser(user);
            res.send({
                message: "User created",
                user: createdUser,
            });
        } catch ({ statusCode, error }: any) {
            res.status(statusCode).send({ message: error?.message });
        }
    }
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            let users: IUser[] = await userService.getUsers();
            res.send(users);
        } catch ({ statusCode, error }: any) {
            res.status(statusCode).send({ message: error.message });
        }
    }
    async getOneUser(req: Request, res: Response) {
        try {
            let { id } = req.params;
            let user = await userService.getOneUser(id);
            res.status(200).send(user);
        } catch ({ statusCode, error }: any) {
            res.status(statusCode).send({ message: error.message });
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
        } catch ({ statusCode, error }: any) {
            res.status(statusCode).send({ message: error.message });
        }
    }
    async deleteUser(req: Request, res: Response) {
        try {
            let { id } = req.params;
            await userService.deleteUser(id);
            res.status(200).send({
                message: "Deleted",
            });
        } catch ({ statusCode, error }: any) {
            res.status(statusCode).send({ message: error.message });
        }
    }
}

export default new userController();
