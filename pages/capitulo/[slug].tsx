import styles from '../../styles/Chapter.module.css'
import prisma from '../../src/libs/backServices/prisma'
import axios from 'axios';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { Aside } from '../../src/components/LayoutComponents/Aside';
import { Header } from '../../src/components/LayoutComponents/Header';
import { useThemeContext } from '../../src/contexts/colorContext/hook';
import { getCloudflareUrl } from '../../src/libs/frontServices/getCloudflareUrl';
import { ChapterWithPagesAndMangaTitle } from '../../src/types/FrontTypes/MangaAndChapters/ChapterWithPagesAndMangaTitle';



const Manga = ({ chapter }: Props) => {
    const { theme } = useThemeContext();
    useEffect(() => {
        const addView = async () => {
            let formData = new FormData();
            formData.append('views', 'true');
            formData.append('chapter_id', chapter.id)
            await axios.put(`/api/chapter`, formData)
        }

        addView()
    }, [])
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div style={{ backgroundColor: theme.primaryColor, color: theme.fontColor }}>
            <Head>
                <title>{`Capítulo ${chapter.chapter} - ${chapter.manga?.title}`}</title>
            </Head>
            <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} absolute={true} />
            <Aside menuOpen={menuOpen} absolute={true} />
            <div style={{ paddingTop: '90px' }}>
                {chapter.pages.map((page, index) => {
                    return (
                        <div key={page.id} className={styles.main} style={{
                            margin: 'auto',
                            maxWidth: '1200px',
                            width: '80%',

                        }}>
                            <div className={styles.image}>
                                <img src={getCloudflareUrl(page.url)} style={{ width: '100%', height: 'fit-content !important' }} alt='' loading={index < 1 ? 'eager' : 'lazy'} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

type Props = {
    chapter: ChapterWithPagesAndMangaTitle
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    let raw = await prisma.chapter.findFirst({ where: { slug: ctx.params!.slug as string }, include: { pages: true, manga: { select: { title: true, } } } })
    let chapter: ChapterWithPagesAndMangaTitle = JSON.parse(JSON.stringify(raw))
    chapter.pages.sort((a, b) => {
        if (a.file_name.split('chapter-')[1].split('/')[1].split('.') > b.file_name.split('chapter-')[1].split('/')[1].split('.')) {
            return 1
        } else {
            return -1
        }
    })
    console.log(chapter.pages[0].file_name)
    return {
        props: { chapter }
    }
}

export default Manga;