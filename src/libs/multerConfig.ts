import { randomUUID } from "crypto";
import multer from "multer";
import fs from 'fs';

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            fs.mkdirSync("./public/tmp", { recursive: true })
            cb(null, "./public/tmp");
        },
        filename: (req, file, cb) => {
            let allowed = ['jpeg', 'jpg', 'png', 'webm']
            allowed.includes(file.mimetype.split('/')[1]) === false ? cb(new Error('image not allowd'), '') :
                cb(null, file.originalname + randomUUID() + '.' + file.mimetype.split('/')[1])
        }
    })
});