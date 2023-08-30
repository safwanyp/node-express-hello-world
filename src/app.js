import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import indexRouter from "./routes/index.route.js";
import messageRouter from "./routes/message.route.js";
import { createMessageTable, createSchema } from "./database/pool.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

createSchema().then(() => {
    console.log("Schema created");
    createMessageTable().then(() => {
        console.log("Message table created");
    });
});

app.use("/", indexRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
