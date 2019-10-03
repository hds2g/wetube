import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStragegy from "passport-facebook";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback
} from "./controller/userController";
import routes from "./routes";

passport.use(User.createStrategy());
console.log(
  process.env.PRODUCTION
    ? `https://secret-forest-59446.herokuapp.com${routes.gitHubLoginCallback}`
    : `http://localhost:4000${routes.gitHubLoginCallback}`
);

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://secret-forest-59446.herokuapp.com${routes.gitHubLoginCallback}`
        : `http://localhost:4000${routes.gitHubLoginCallback}`
    },
    githubLoginCallback
  )
);

passport.use(
  new FacebookStragegy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `https://splendid-crab-82.localtunnel.me${routes.facebookLoginCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
