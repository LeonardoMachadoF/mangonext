import { randomUUID } from "crypto";
import multer from "multer";
import path from 'path';

export const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, './public/tmp'));
        },
        filename: (req, file, cb) => {
            let allowed = ['jpeg', 'jpg', 'png', 'webm']
            allowed.includes(file.mimetype.split('/')[1]) === false ? cb(new Error('image not allowd'), '') :
                cb(null, file.originalname + randomUUID() + '.' + file.mimetype.split('/')[1])
        }
    })
});