import cors from "cors";
import express, { Request, Response } from "express";
import errorHandler from "./middleware/error-handler";
import authRouter from "./routes/auth.route";
import userRouter from './routes/user.route'

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running...");
});

app.use("/auth", authRouter);
app.use("/user", userRouter)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
