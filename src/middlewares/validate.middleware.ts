import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validateData = (scheme: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = scheme.validate(req.body);
        console.log(req.body);

        console.log(error);

        if (error) {
            return res.status(400).send({
                message: error.message,
            });
        }
        next();
    };
};

export default validateData;
