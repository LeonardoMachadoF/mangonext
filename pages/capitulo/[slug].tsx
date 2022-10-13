import { Chapter, Page } from '@prisma/client';
import styles from '../../styles/Chapter.module.css'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { DetailedHTMLProps, ImgHTMLAttributes, ReactElement, useEffect, useRef, useState } from 'react';
import { Aside } from '../../components/Aside';
import { Header } from '../../components/Header';
import prisma from '../../src/libs/prisma'
import axios from 'axios';



const Manga = ({ chapter }: Props) => {
    useEffect(() => {
        const addView = async () => {
            let formData = new FormData();
            formData.append('views', 'true');
            formData.append('chapter_id', chapter.id)
            let res = await axios.put(`/api/chapter`, formData)
        }

        addView()
    }, [])
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div>
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
                                <img src={page.url} style={{ width: '100%', height: 'fit-content !important' }} alt='' loading={index < 1 ? 'eager' : 'lazy'} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

type Props = {
    chapter: (Chapter & {
        pages: Page[];
    })
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    let raw = await prisma.chapter.findFirst({ where: { slug: ctx.params!.slug as string }, include: { pages: true } })
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