import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { prisma } from "./prisma.js";
import { userRouter } from "./routes/index.js";

const { PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
);

//routes
app.use("/users", userRouter);

app.get("/", (_req, res) => {
    res.status(200).json("Welcome!");
});

(async () => {
    try {
        if (!PORT) {
            throw Error("Missing env");
        }
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(`Listenin on ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
    }
})();
