const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");

const passportConfig = require("./passport-config");
const indexRouter = require("./routes/index.route.js");
const messageRouter = require("./routes/message.route.js");
const errorMiddleware = require("./middlewares/error.middleware.js");
const httpLogger = require("./utils/httpLogger.js");
const userRouter = require("./routes/user.route.js");

dotenv.config();
passportConfig(passport);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(httpLogger)
    .use(cors())
    .use(helmet())
    .use(express.json())
    .use(passport.initialize())

    .use("/", indexRouter)
    .use("/messages", messageRouter)
    .use("/users", userRouter)

    .use(errorMiddleware);

app.listen(PORT);

module.exports = app;
