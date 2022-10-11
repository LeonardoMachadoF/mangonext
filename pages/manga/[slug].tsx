import { Chapter, GenresOnMangas, Manga } from '@prisma/client';
import { GetServerSideProps } from 'next'
import prisma from '../../src/libs/prisma'

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { slug } = context.query;
    const manga = await prisma.manga.findFirst({
        where: {
            slug: slug as string
        },
        include: {
            chapters: true,
            genres: true
        }
    })
    console.log(manga)

    return {
        props: {
            manga: JSON.stringify(manga)
        }
    }
}

type Props = {
    manga: (Manga & {
        chapters: Chapter[];
        genres: GenresOnMangas[];
    })
}

const Manga = (props: Props) => {
    console.log(props)
    return (
        <div>

        </div>
    )
}

export default Manga;