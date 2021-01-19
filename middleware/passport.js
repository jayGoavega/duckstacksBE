const userModel = require("../models/users");
const { Strategy, ExtractJwt } = require("passport-jwt");

var opts={
jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey : process.env.APP_SECRET,
}

exports.passportFun = (passport)=>{
  passport.use( new Strategy(opts,async(payload,done)=>{
      await userModel.get(payload.user_id).then((user)=>{
          if (user) {
              return done(null,user)
          }else{
            return done(null, false);
          }
      }).catch((e)=>{
        return done(null, false);
      })
  }))
} 

