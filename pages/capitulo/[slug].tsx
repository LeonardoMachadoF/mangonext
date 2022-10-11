import { Chapter, Page } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Header } from '../../components/Header';
import prisma from '../../src/libs/prisma'



const Manga = ({ chapter }: Props) => {
    console.log(chapter)
    return (
        <div>
            {chapter.pages.map((page) => {
                return (
                    <div key={page.id} style={{
                        margin: 'auto',
                        maxWidth: '1200px',
                        width: '80%'
                    }}>
                        <img src={page.url} style={{ width: '100%' }} alt='' loading="lazy" />
                    </div>
                )
            })}
        </div>
    )
}

type Props = {
    chapter: (Chapter & {
        pages: Page[];
    })
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let raw = await prisma.chapter.findFirst({ where: { slug: ctx.query.slug as string }, include: { pages: true } })
    let chapter = JSON.parse(JSON.stringify(raw))
    chapter.pages.sort((a: Page, b: Page) => {
        if (a.file_name.split('chapter-')[1].split('/')[1].split('.') > b.file_name.split('chapter-')[1].split('/')[1].split('.')) {
            return 1
        } else {
            return -1
        }
    })

    return {
        props: { chapter }
    }
}

export default Manga;