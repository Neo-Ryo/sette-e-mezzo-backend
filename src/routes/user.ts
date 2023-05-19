import { Router } from "express";
// local
import { createUser, getAllUsers, login } from "../controllers/user.js";
import { validator, checkCreateUserPayload } from "../middlewares/index.js";

export const userRouter = Router();

// users
userRouter.post("/", checkCreateUserPayload(), validator, createUser);
userRouter.get("/", /* check creds of some sort */ getAllUsers);

//login
userRouter.post("/login", checkCreateUserPayload(), validator, login);
