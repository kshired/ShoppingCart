const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3 = new AWS.S3();

const uploadToS3 = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, Date.now() + '.' + file.originalname.split('.').pop());
    },
  }),
});

const uploadImage = async (req, res) => {
  const img = req.file.location;
  if (img === undefined) {
    res.status(400).send({
      ok: false,
      message: 'File is not exist!',
    });
    return;
  }
  res.status(200).send({
    ok: true,
    data: {
      img,
    },
  });
};

module.exports = {
  uploadToS3,
  uploadImage,
};
