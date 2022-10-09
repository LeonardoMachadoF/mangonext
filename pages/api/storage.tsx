import nc from 'next-connect';
import { NextApiResponse } from "next";
import { storageApi } from "../../src/libs/storageApi";
import { Credentials } from "../../src/types/Credentials";
import { upload } from "../../src/libs/multerConfig";
import { NextApiRequestWithFiles } from '../../src/types/ExtendedRequestWithFiles';
import { unlinkSync } from 'fs';
import prisma from '../../src/libs/prisma'
export const config = { api: { bodyParser: false, }, }

const handler = nc();
handler.use(upload.array('imgs', 225))
handler.get(async (req, res: NextApiResponse) => {
    res.redirect(307, '/');
})
handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    let { manga, volume, chapter, manga_id } = req.body;
    if (!manga || !volume || !chapter) {
        if (req.files) {
            req.files.forEach((file) => {
                unlinkSync(file.path)
            })
        }
        return res.json({ error: 'Dados incompletos, por favor, informar manga, volume e capitulo.' })
    }

    let data = await storageApi.getCredentials();
    let credentials: Credentials = {
        accountId: data.accountId,
        applicationKey: data.applicationKey,
        apiUrl: data.apiUrl,
        authorizationToken: data.authorizationToken,
        downloadUrl: data.downloadUrl,
        recommendedPartSize: data.recommendedPartSize,
        bucketName: data.bucketName,
        bucketId: data.bucketId
    }

    let path = `${manga}/volume-${volume}/chapter-${chapter}`
    let urls = await storageApi.uploadChapterPages(credentials, req.files, path)

    let newChapter = await prisma.chapter.create({
        data: {
            title: manga as string,
            slug: manga as string,
            chapter: parseInt(chapter),
            views: 0,
            volume: parseInt(volume),
            manga_id: manga_id as string,
        }
    })


    await Promise.all(urls.map(async (url: string) => {
        await prisma.page.create({
            data: {
                url: url,
                chapter_id: newChapter.id
            }
        })
    }))

    res.json({ urls });
    return
})

export default handler;