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
    let { manga, volume, chapter, manga_slug, manga_id, title } = req.body;
    if (!manga || !volume || !chapter || (!manga_id && !manga_slug)) {
        if (req.files) {
            req.files.forEach((file) => {
                console.log(file.path)
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

    let path = `${manga.toLowerCase()}/volume-${volume}/chapter-${chapter}`
    let urls = await storageApi.uploadChapterPages(credentials, req.files, path)

    let mangaPrisma: any = '';
    if (manga_id) {
        mangaPrisma = { id: manga_id }
    } else {
        mangaPrisma = await prisma.manga.findFirst({ where: { slug: manga_slug }, select: { id: true } });
    }
    if (mangaPrisma === null) {
        return res.json({ error: 'manga não encontrado!' })
    }

    let newChapter = await prisma.chapter.create({
        data: {
            title: title as string,
            slug: path.split('/').join('-') as string,
            volume: parseInt(volume),
            chapter: parseInt(chapter),
            manga_id: mangaPrisma.id as string,
            views: 0,
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

    res.json({ newChapter, urls });
    return
})

export default handler;