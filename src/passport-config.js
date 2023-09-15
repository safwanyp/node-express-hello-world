const bcrypt = require("bcrypt");
const userRepository = require("./repositories/user.repository.js");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

function passportConfig(passport) {
    // get the current request and the username and password from the request
    passport.use(
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, username, password, done) => {
                try {
                    const user = await userRepository.getUserByUsername(
                        req,
                        username,
                    );
                    if (!user) {
                        return done(null, false, {
                            message: "No user with that username",
                        });
                    }

                    if (bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "Password incorrect",
                        });
                    }
                } catch (err) {
                    return done(err);
                }
            },
        ),
    );

    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        passReqToCallback: true,
    };

    passport.use(
        new JwtStrategy(opts, (req, jwt_payload, done) => {
            try {
                const user = userRepository.getUserById(req, jwt_payload.id);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err, false);
            }
        }),
    );
}

module.exports = passportConfig;
