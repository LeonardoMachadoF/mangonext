import nc from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import { upload } from "../../src/libs/backServices/multerConfig";
import prisma from '../../src/libs/backServices/prisma'
export const config = { api: { bodyParser: false, }, }

const handler = nc();
handler.use(upload.array('img', 1))

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    let { title: titleInput } = req.query
    if (!titleInput) {
        return res.json({})
    }

    let mangas = await prisma.manga.findMany({ where: { title: { contains: titleInput as string } }, take: 10 })
    res.json({ mangas })
})

// handler.post(async (req: NextApiRequestWithFiles, res: NextApiResponse) => {
//     let { title, genres, sinopse, author, artist } = req.body;
//     let slug = title.split(' ').join('-').toLowerCase().split('?').join('');
//     let credentials = await storageApi.getCredentials();
//     let { urls } = await storageApi.uploadChapterPages(credentials, [...req.files], slug)
//     const newManga = await prisma.manga.create({
//         data: {
//             title,
//             slug,
//             image_url: urls[0],
//             sinopse: sinopse as string,
//             author: author as string,
//             artist: artist as string,
//         }
//     })

//     if (!newManga) {
//         return res.json({ error: 'Titúlo de manga já existente!' })
//     }

//     genres.split(';').map(async (genre: string) => {
//         let connect = await prisma.genre.findFirst({ where: { slug: genre } });
//         if (connect) {
//             await prisma.genresOnMangas.create({
//                 data: {
//                     manga_id: newManga.id,
//                     genre_id: connect.id,
//                 }
//             })
//         } else {
//             let newGenre = await prisma.genre.create({
//                 data: {
//                     name: genre[0].toUpperCase() + genre.substring(1),
//                     slug: genre
//                 }
//             })
//             await prisma.genresOnMangas.create({
//                 data: {
//                     manga_id: newManga.id,
//                     genre_id: newGenre.id
//                 }
//             })
//         }
//     })

//     return res.json({ newManga })
// })

handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    let { views, manga_id } = req.body;
    if (views) {
        await prisma.manga.update({
            where: { id: manga_id },
            data: {
                views: { increment: 1 }
            }
        })
    }
    res.json({})
})

handler.patch(async (req: NextApiRequest, res: NextApiResponse) => {
    const { sinopse, manga_slug, authorization, genres, manga_id, status, author } = req.body;

    if (!authorization || authorization !== process.env.COOKIE as string) {
        return res.json({ error: 'Unauthorized!' })
    }

    let data: any = {};
    if (sinopse) {
        data.sinopse = sinopse;
    }
    if (status) {
        data.status = status;
    }
    if (author) {
        data.author = author;
    }

    if (genres) {
        await prisma.genresOnMangas.deleteMany({ where: { manga_id: manga_id } });
        genres.split(';').map(async (genre: string) => {
            let connect = await prisma.genre.findFirst({ where: { slug: genre } });
            if (connect) {
                await prisma.genresOnMangas.create({
                    data: {
                        manga_id: manga_id,
                        genre_id: connect.id,
                    }
                })
            } else {
                let newGenre = await prisma.genre.create({
                    data: {
                        name: genre[0].toUpperCase() + genre.substring(1),
                        slug: genre
                    }
                })
                await prisma.genresOnMangas.create({
                    data: {
                        manga_id: manga_id,
                        genre_id: newGenre.id
                    }
                })
            }
        })
    }

    await prisma.manga.update({ where: { slug: manga_slug }, data });
    return res.status(200).json({});
})

export default handler;