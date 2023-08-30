import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import indexRouter from "./routes/index.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", indexRouter);
app.use("/messages", messageRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
