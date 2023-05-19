import { NextFunction, Request, Response } from "express";
import { body, validationResult, ValidationChain } from "express-validator";

export const validator = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        next();
    } else {
        res.status(406).json({ code: 406, errors: result.array() });
    }
};

export const checkCreateUserPayload = (): ValidationChain[] => {
    return [body(["name", "password"]).isString().notEmpty()];
};
