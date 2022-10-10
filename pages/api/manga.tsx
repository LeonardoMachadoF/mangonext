import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import { storageApi } from "../../src/libs/storageApi";
import { Credentials } from "../../src/types/Credentials";
import { upload } from "../../src/libs/multerConfig";
import { NextApiRequestWithFiles } from '../../src/types/ExtendedRequestWithFiles';
import { unlinkSync } from 'fs';
import prisma from '../../src/libs/prisma'
import { requestValidator } from '../../src/libs/requestValidator';
export const config = { api: { bodyParser: false, }, }

const handler = nc();
handler.use(upload.array('imgs', 100))

handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {

    return res.json({})
})


export default handler;