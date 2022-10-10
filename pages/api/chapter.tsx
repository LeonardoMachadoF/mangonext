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
    let { manga, volume, chapter, manga_id, title, error } = await requestValidator(req.body);
    if (error) {
        if (req.files) {
            req.files.forEach((file) => {
                unlinkSync(file.path)
            })
        }
        return res.json({ error })
    }

    let credentials: Credentials = await storageApi.getCredentials();

    let path = `${manga.toLowerCase()}/volume-${volume}/chapter-${chapter}`
    let { aditionalPagesInfo, urls } = await storageApi.uploadChapterPages(credentials, req.files, path)

    let newChapter = await prisma.chapter.create({
        data: {
            title: title as string,
            slug: path.split('/').join('-') as string,
            volume: parseInt(volume),
            chapter: parseInt(chapter),
            manga_id: manga_id.id as string,
            views: 0,
        }
    })

    await Promise.all(urls.map(async (url: string, index: number) => {
        await prisma.page.create({
            data: {
                url: url,
                chapter_id: newChapter.id,
                file_id: aditionalPagesInfo[index].fileId,
                file_name: aditionalPagesInfo[index].fileName
            }
        })
    }))

    res.json({ newChapter, urls });
    return
})

handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
    let { chapter_id, chapter_slug } = req.body;

    if (!chapter_id && !chapter_slug) {
        return res.json({ error: 'Insira um capítulo' })
    }

    let chapter: any = [];
    if (chapter_slug && !chapter_id) {
        chapter = await prisma.chapter.delete({ where: { slug: chapter_slug }, include: { pages: true } }).catch(err => {
            throw new Error(err.meta.cause)
        })
    } else {
        chapter = await prisma.chapter.delete({ where: { id: chapter_id }, include: { pages: true } }).catch(err => {
            throw new Error(err.meta.cause)
        })
    }

    let credentials: Credentials = await storageApi.getCredentials();
    await storageApi.deleteUploadedPages(credentials, chapter.pages)


    let urls = chapter.pages.map((i: { url: string }) => i.url);
    await Promise.all(urls.map(async (url: string) => {
        await prisma.page.delete({ where: { url: url } });
    }))


    return res.json({ status: 'success' })
})

export default handler;