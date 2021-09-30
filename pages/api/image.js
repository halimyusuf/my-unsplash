// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cloudinary from "cloudinary";
import intializeDB from "../../config/mongoose";
import ENVS from "../../config/process.env";
import logger from "../../utils/logger";

intializeDB();
cloudinary.config(ENVS.cloudinaryUrl);

export default function handler(req, res) {
  if (req.method == "POST") {
    logger(req.body);
    // cloudinary.v2.uploader.upload(
    //   "https://images.unsplash.com/photo-1606787947360-4181fe0ab58c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDF8MXxhbGx8MjZ8fHx8fHwyfHwxNjMyOTI0MDQ2&ixlib=rb-1.2.1&q=80&w=1080",
    //   function (err, result) {
    //     console.log(result);
    //   }
    // );
    res.status(200).json({ name: "John Doe" });
  } else {
    res.status(404).json({ name: "Invalid request" });
  }
}
