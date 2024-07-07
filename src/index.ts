import express, { Application } from "express";
import userRouter from "./routes/user.route";
import { configDotenv } from "dotenv";
configDotenv();
import("./database");

let app: Application = express();
app.use(express.json());

// routes
app.use("/user", userRouter);

app.listen(8080, () => {
    console.log("Server is on port 8080");
});
