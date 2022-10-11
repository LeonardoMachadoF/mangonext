import { Chapter, GenresOnMangas, Manga } from '@prisma/client';
import { GetServerSideProps } from 'next'
import Link from 'next/link';
import prisma from '../../src/libs/prisma'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.query;
    const manga = await prisma.manga.findFirst({
        where: {
            slug: slug as string
        },
        include: {
            chapters: {
                select: {
                    slug: true,
                    title: true
                }
            },
            genres: true
        }
    })

    return {
        props: {
            manga: { ...manga, created_at: '' }
        }
    }
}

type Props = {
    manga: (Manga & {
        chapters: Chapter[];
        genres: GenresOnMangas[];
    })
}

const Manga = (data: Props) => {
    return (
        <div style={{ color: 'white' }}>
            <p>{data.manga.title}</p>
            <img src={data.manga.image_url} alt="" width={200} height={300} />
            <p>{data.manga.sinopse}</p>
            <p>{data.manga.id}</p>
            <p>
                <Link href={`/capitulo/${data.manga.chapters[0].slug}`}>
                    <a >{data.manga.chapters[0].title}</a>
                </Link>
            </p>
            <p>{data.manga.slug}</p>
        </div>
    )
}

export default Manga;