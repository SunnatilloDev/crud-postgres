import Joi from "joi";

const userScheme = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    salary: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
});

export { userScheme };
