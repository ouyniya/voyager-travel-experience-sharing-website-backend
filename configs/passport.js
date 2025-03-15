const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

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
        const { email, id, displayName, photos } = profile;

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
              username: displayName || email.split("@")[0],
              profileImage: photos[0].value,
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
