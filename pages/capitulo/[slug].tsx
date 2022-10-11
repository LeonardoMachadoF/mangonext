import { Chapter, GenresOnMangas, Page } from '@prisma/client';
import { GetServerSideProps } from 'next'
import Link from 'next/link';
import prisma from '../../src/libs/prisma'

export const getServerSideProps: any = async (context: any) => {
    const { slug } = context.query;
    const chapter = await prisma.chapter.findFirst({
        where: {
            slug: slug as string
        },
        include: {
            pages: {
                orderBy: {
                    file_name: 'asc'
                }
            }
        }
    })

    if (!chapter) {
        return
    }
    let res: any = chapter.pages.sort((a: any, b: any) => a.file_name.split('-')[6].split('(').join('').split(')')[0] - b.file_name.split('-')[6].split('(').join('').split(')')[0] > 0 ? 1 : -1)

    return {
        props: {
            chapter: { ...chapter, created_at: '', pages: res }
        }
    }
}

type Props = {
    chapter: (Chapter & {
        pages: Page[];
    })
}

const Manga = (data: Props) => {
    return (
        <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {data.chapter.pages.map((page) => {
                return (
                    <img src={page.url} alt="" key={page.id} />
                )
            })}
        </div>
    )
}

export default Manga;