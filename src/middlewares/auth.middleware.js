import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (token) {
            let user = jwt.verify(token, process.env.JWT_SECRET);

            if (!user) {
                return next({
                    message: "Unauthorized",
                    code: 401,
                });
            }

            next();
        }
    } catch (error) {
        next({
            message: "Unauthorized",
            code: 401,
        });
    }
}

export default authMiddleware;
