import fs from "fs";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const path = `uploads/${req.params.folder}`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes =
    /jpg|jpeg|png|PNG|JPEG|JPG|PDF|pdf|TXT|txt|webp|WEBP|GIF|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("images", 10);

export const uploadDocument = async (req, res) => {
  try {
    const reqFiles = [];
    upload(req, res, function (err) {
      console.log("filesss backendd---------------", req.files);
      for (let i = 0; i < req.files.length; i++) {
        console.log("Current file : ", req.files[i].path);
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          throw new Error(err);
        } else if (err) {
          // An unknown error occurred when uploading.
          throw new Error(err);
        }
        const url = req.protocol + "://" + req.get("host") + "/";

        const ext = path.extname(req.files[i].filename).toLowerCase();
        const path2 = `uploads/${req.params.folder}/`;
        // const path2 = `${req.params.folder}/`
        const dNow = Date.now();
        const newPath = `${path2}${dNow}${ext}`;
        // new Date().toISOString().replace(/:/g, '-')
        console.log("new path : ", newPath);
        fs.renameSync(req.files[i].path, newPath);
        // remove the uploads file path
        const renameNewPath = `${req.params.folder}/${dNow}${ext}`;

        reqFiles.push(url + renameNewPath);
      }
      res.json(reqFiles);
    });
  } catch (e) {
    console.log("Error in upload", e);
    res.status(503).send({
      message: "Error uploading document.",
    });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const folder = req.params.folder;
    const imgName = req.params.imgName;

    const path = `./uploads/${folder}/${imgName}`;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err);
        res.json(403).send({
          message: "Failed to delete the document.",
        });
      }
      console.log("File deleted ", path);

      res.json(true);
    });
  } catch (e) {
    console.log("Error in upload", e);
    res.status(403).send({
      message: "Error uploading document.",
      error: e,
    });
  }
};
