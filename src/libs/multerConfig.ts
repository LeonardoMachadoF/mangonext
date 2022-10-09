import { randomUUID } from "crypto";
import multer from "multer";
import fs from 'fs';
import path from "path";

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdirSync(path.join("./public/tmp"), { recursive: true })
            cb(null, path.join("./public/tmp"));
        },
        filename: (req, file, cb) => {
            let allowed = ['jpeg', 'jpg', 'png', 'webm']
            allowed.includes(file.mimetype.split('/')[1]) === false ? cb(new Error('image not allowd'), '') :
                cb(null, file.originalname + randomUUID() + '.' + file.mimetype.split('/')[1])
        }
    })
});