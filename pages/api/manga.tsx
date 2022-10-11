import nc from 'next-connect';
import { NextApiResponse } from "next";
import { upload } from "../../src/libs/multerConfig";
import { NextApiRequestWithFiles } from '../../src/types/ExtendedRequestWithFiles';
import prisma from '../../src/libs/prisma'
import { storageApi } from "../../src/libs/storageApi";
export const config = { api: { bodyParser: false, }, }

const handler = nc();
handler.use(upload.array('img', 1))

handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
    let { title, genres } = req.body;
    let slug = title.split(' ').join('-').toLowerCase();
    let credentials = await storageApi.getCredentials();
    let { urls } = await storageApi.uploadChapterPages(credentials, [...req.files], slug)
    const newManga = await prisma.manga.create({
        data: {
            title,
            slug,
            image_url: urls[0],
        }
    })

    genres.split(';').map(async (genre: string) => {
        let connect = await prisma.genre.findFirst({ where: { slug: genre } });
        if (!connect) {
            return res.json({ error: 'Gênero/s inválidos!' })
        }
        await prisma.genresOnMangas.create({
            data: {
                manga_id: newManga.id,
                genre_id: connect.id
            }
        })
    })

    return res.json({ newManga })
})


export default handler;