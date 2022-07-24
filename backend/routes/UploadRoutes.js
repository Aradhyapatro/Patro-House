import express from 'express';
import path from 'path'
import multer from 'multer'
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'Uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.feildname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType() {
    const fileType = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images Only');
    }

}

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/uploads/${req.name}`);
})

export default router; 