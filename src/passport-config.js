const bcrypt = require("bcrypt");
const userRepository = require("./repositories/user.repository.js");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

function passportConfig(passport) {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await userRepository.getUserByUsername(username);
                if (!user) {
                    return done(null, false, {
                        message: "No user with that username",
                    });
                }

                if (bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Password incorrect" });
                }
            } catch (err) {
                return done(err);
            }
        }),
    );

    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    };

    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            try {
                const user = userRepository.getUserById(jwt_payload.id);
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
