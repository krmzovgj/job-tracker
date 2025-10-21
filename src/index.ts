import express, { Request, Response } from "express";
import cors from "cors";

const PORT = process.env.PORT || 8080

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running...")
})

app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`)
})