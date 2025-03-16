const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const prisma = require("./prisma");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("*****Google Profile:", profile);
        const { email, name, picture } = profile._json;
        const { id } = profile;

        // Check if the user already exists in DB
        let user = await prisma.user.findUnique({
          where: { googleId: id },
        });

        // If user doesn't exist, create a new one
        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: id,
              email,
              username: name || email.split("@")[0],
              profileImage: picture,
              isGoogleUser: true,
            },
          });
        }

        // Return the user object
        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
