// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cloudinary from "cloudinary";
import nc from "next-connect";
import intializeDB from "../../config/mongoose";
import ENVS from "../../config/process.env";
import logger from "../../utils/logger";
import Image from "../../model/Image";

const app = nc();

intializeDB();
cloudinary.config(ENVS.cloudinaryUrl);

function cloudinaryHelp(url) {
  console.log(url);
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(url, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result.secure_url);
      }
    });
  });
}

app.post(async (req, res) => {
  const { label } = req.body;
  try {
    const url = await cloudinaryHelp(req.body.imageUrl);
    let newImg = new Image({ url, label });
    try {
      newImg = await newImg.save();
      res.status(200).json({ data: newImg });
    } catch (error) {
      logger(error);
      res.status(500).json({ error: "Server error" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Invalid image url" });
  }
});

app.get(async (req, res) => {
  const images = await Image.find();
  // console.log(JSON.stringify(images));
  return res.status(200).json({ data: images });
});

// await Kitten.find({ name: /^fluff/ });
export default app;
