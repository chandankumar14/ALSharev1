const JwtStrategy  = require("passport-jwt").Strategy
const ExtractJwt =  require("passport-jwt").ExtractJwt
const userModel = require("../../src/models/users/user")

//**********middle wares for validation**********
module.exports = function (passport) {
    var option = {}
    option.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    option.secretOrKey = "ALShare@123$12";
    passport.use(new JwtStrategy(option, async (jwt_payload, done) => {
        let user = await userModel.query().where("userId", jwt_payload.userId).first();
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }))
}

