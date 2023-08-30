import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import indexRouter from "./routes/index.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Testing the Cloud Build trigger once again finally? nope once again

app.use("/", indexRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
