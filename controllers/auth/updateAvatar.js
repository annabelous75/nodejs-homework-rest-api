const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const cloudinary = require("cloudinary").v2;

const { User } = require("../../models/users");

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id } = req.user;
  const filename = `${_id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarDir, filename);

    await Jimp.read(tempUpload)
      .then((img) => img.resize(250, 250).write(resultUpload))
      .catch((err) => {
        console.error(err);
      });

    await fs.unlink(tempUpload);

    const cloudinaryRes = await cloudinary.uploader.upload(
      `public/avatars/${filename}`,
      {
        upload_preset: "ml_default",
      }
    );
    console.log(cloudinaryRes);

    await User.findByIdAndUpdate(_id, { avatarURL: cloudinaryRes.url });

    if (cloudinaryRes) {
      fs.unlink(resultUpload);
    }

    return res.json({
      avatarURL: cloudinaryRes.url,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateAvatar;