import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  //console.log(req.body); // by bodyParser
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    req.flash("error", "password don't match");
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
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureFlash: "Can't login"
});

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't login"
});

//export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
export const githubLoginCallback = async (_, __, profile, cb) => {
  //console.log(profile, cb);
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
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
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "Welcome",
  failureFlash: "Can't login"
});

export const facebookLoginCallback = async (_, __, profile, cb) => {
  //console.log(profile);
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("facebookLoginCallback find user");
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    console.log("facebookLoginCallback: not find user, will create");
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  //console.log("logout");
  req.flash("info", "Loged out, see you later");
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).populate("videos");
  //const user_video = req.user.populate("videos");
  console.log(user);
  res.render("userDetail", { pageTitle: "User Detail", user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  //console.log(req);

  try {
    const user = await User.findById(id).populate("videos");
    console.log(user.videos);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "User can't find");
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    location // multer에서 파일이 있으면 req에 추가 해줌
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: location ? location.path : req.user.avatarUrl
    });
    req.flash("success", "Profile updated");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update profile");
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("ChangePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      console.log("different password");
      req.flash("error", "password don't match");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    console.log("change password");
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't change password");
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};
