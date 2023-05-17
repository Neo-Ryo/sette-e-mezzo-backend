import bcrypt from "bcryptjs";
import { prisma } from "../prisma.js";
import { Request, Response } from "express";

const salt = bcrypt.genSaltSync(12);

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany({
            select: { name: true, uuid: true },
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const { name, password } = req.body;
        console.log(salt);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await prisma.user.create({
            data: { name, password: hashPassword },
        });
        res.status(201).json({ name: user.name, uuid: user.uuid });
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { name, password } = req.body;
        const user = await prisma.user.findUniqueOrThrow({ where: { name } });
        const check = bcrypt.compareSync(password, user.password);
        console.log(check);

        if (!check) {
            throw Error("Wrong password");
        }
        res.status(200).json({ name: user.name, uuid: user.uuid });
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
}
