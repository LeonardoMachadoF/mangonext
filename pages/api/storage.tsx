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

handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    let { manga, volume, chapter } = req.body;
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
            title: manga,
            slug: manga,
            volume: parseInt(volume),
            chapter: parseInt(chapter),
            manga_id: '6fc02fb9-278e-4207-8a2e-912509b36b42',
            views: 0
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