import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const uploadedVideo = await Video.find({});
    console.log(uploadedVideo);
    res.render("home", { pageTitle: "Home", videos: uploadedVideo }); // 해당 페이지로 가면서 { ~ }안에 있는 데이터도 같이 전달 됨, 그래서 pug/mixin에서도 사용가능
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", uploadedVideo: [] });
  }
};

export const search = (req, res) => {
  //const searchingBy = req.query.term;

  // object destructuring
  /*
var o = {p: 42, q: true};
var {p: foo, q: bar} = o;

console.log(foo); // 42
console.log(bar); // true
  */
  const {
    query: { term: searchingBy }
  } = req;

  //res.render("search", { pageTitle: "Search", searchingBy: searchingBy });
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    //body: { file, title, description }
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  //console.log(body, file);
  //console.dir(file, title, description);
  // To Do: Upload and save video
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(route.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  console.log("postEditVideo");
  const {
    params: { id },
    body: { title, description }
  } = req;

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};
