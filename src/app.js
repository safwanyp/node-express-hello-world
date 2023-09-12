const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const indexRouter = require("./routes/index.route.js");
const messageRouter = require("./routes/message.route.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const httpLogger = require("./utils/httpLogger.js");
const userRouter = require("./routes/user.route.js");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(httpLogger)
    .use(cors())
    .use(helmet())
    .use(express.json())

    .use("/", indexRouter)
    .use("/messages", messageRouter)
    .use("/users", userRouter)

    .use(errorMiddleware);

app.listen(PORT, () => {
    console.log("Environment: ", process.env.NODE_ENV);
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
