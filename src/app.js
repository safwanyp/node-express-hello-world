const passport = require("passport");
const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");

const errorMiddleware = require("./middlewares/error.middleware.js");
const requestIdMiddleware = require("./middlewares/id.middleware");
const messageRouter = require("./routes/message.route.js");
const indexRouter = require("./routes/index.route.js");
const userRouter = require("./routes/user.route.js");
const passportConfig = require("./passport-config");
const httpLogger = require("./utils/httpLogger.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger-spec.js");

dotenv.config();
passportConfig(passport);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(requestIdMiddleware)
    .use(httpLogger)
    .use(cors())
    .use(helmet())
    .use(express.json())
    .use(passport.initialize())

    .use("/", indexRouter)
    .use("/messages", messageRouter)
    .use("/users", userRouter)
    .use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

    .use(errorMiddleware);

app.listen(PORT);

module.exports = app;
