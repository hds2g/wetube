import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  console.log(req.body); // by bodyParser
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    // To do: Log user in
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

//export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
export const githubLoginCallback = async (_, __, profile, cb) => {
  console.log(profile, cb);
  const {
    _json: { id, avatar_url, name, email }
  } = profile;

  try {
    //const user = await User.findOne({ email: email });;
    const user = await User.findOne({ email });
    if (user) {
      console.log("githubLoginCallback find user");
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    console.log("githubLoginCallback: not find user, will create");
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatar_url
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("ChangePassword", { pageTitle: "Change Password" });
