const newsfeed = require("../models/mongo").NewsFeeds;
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

const Imgstore = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    const preffix = Date.now();
    const extname = path.extname(file.originalname);
    cb(null, preffix + extname);
  },
});
const Img = multer({ storage: Imgstore });

//POST A NEWS FEED
module.exports.Newsfeedcreate = [
  Img.single("images"),
  body("newsfeeds_uid").notEmpty().withMessage("Newsfeed id is requied"),
  body("title").exists().withMessage("Tittle is requried"),
  body("feeds_type")
    .isIn(["NEWS_FEEDS", "ARTICLES"])
    .withMessage("Invalid Type")
    .exists("Type is required"),
  body("content").exists().withMessage("Content is requried"),
  body("images").notEmpty().withMessage("Image Path is requried"),
  body("posted_by_caregiver")
    .notEmpty()
    .withMessage("Job seeker id is rquried"),
  body("posted_by_admin").notEmpty().withMessage("User id is rquried"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const uploadfeed = req.body;
    uploadfeed.images = req.file ? req.file.path : null;
    await newsfeed
      .create(uploadfeed)
      .then((result) => {
        console.log("Created a Newsfeed with an image");
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send(err);
      });
  },
];

//GET ALL NEWS FEED
module.exports.allnewsfeed = async (req, res) => {
  await newsfeed
    .find({})
    .then((result) => {
      console.log("Returned all newsfeed from DB");
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

// UPDATE A SPCIFIC NEWS FEED
module.exports.updatednewsfeed = async (req, res) => {
  const _id = req.params.id;
  const newsfeed = await newsfeed.findById(_id);
  if (!newsfeed) {
    return res.status(404).send({ message: "Newsfeed not found" });
  }
  try {
    const updatedNewsfeed = await newsfeed.findByIdAndUpdate(_id, updateData, {
      new: true,
    });
    console.log("Updated a news feed in DB");
    res.status(200).send(updatedNewsfeed);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

//DELETE A PARTICULAR NEWS FEED
module.exports.deleteonenewsfeed = async (req, res) => {
  const _id = req.params.id;
  const newsfeed = await newsfeed.findById(_id);
  if (!newsfeed) {
    return res.status(404).send({ message: "Newsfeed not found" });
  }
  await newsfeed
    .findByIdAndRemove(_id)
    .then((result) => {
      console.log("Removed a news feed");
      res.send({ message: "Deleted" });
    })
    .catch((err) => {
      console.log(err);
    });
};
