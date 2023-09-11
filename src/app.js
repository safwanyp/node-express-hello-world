import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import indexRouter from "./routes/index.route.js";
import messageRouter from "./routes/message.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import httpLogger from "./utils/httpLogger.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(httpLogger);

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", indexRouter);
app.use("/messages", messageRouter);
app.use("/users", userRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Environment: ", process.env.NODE_ENV);
    console.log(`Server listening on port ${PORT}`);
});

export default app;
