import nc from "next-connect";
import Image from "../../../../model/Image";

const app = nc();

app.get(async (req, res) => {
  console.log(req.query, req.param);
  const { q } = req.query;
  const images = await Image.find({ label: { $regex: q, $options: "i" } });
  return res.status(200).json({ data: images });
});

export default app;
