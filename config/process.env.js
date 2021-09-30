import dotenv from "dotenv";
dotenv.config();

const envs = {
  cloudinaryUrl: process.env.CLOUDINARY_URL,
  DB_URL: process.env.MONGO_URL,
};

export default envs;
