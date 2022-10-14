import type { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { FileArrowUp, Lightbulb, TrendUp } from 'phosphor-react'
import { useState } from 'react'
import { Aside } from '../components/Aside'
import { FollowingItem } from '../components/FollowingItem'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Trending } from '../components/Trending'
import { useThemeContext } from '../contexts/colorContext/hook'
import styles from '../styles/Home.module.css'
import prisma from '../src/libs/prisma';
import { Chapter, GenresOnMangas, Origin } from '@prisma/client'

const Home = ({ mangas }: Props) => {
    const { theme } = useThemeContext();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={styles.homePage} style={{ backgroundColor: theme.primaryColor, color: theme.fontColor }} >
            <Head>
                <title>Mango Mangna</title>
                <meta name="title" content="MangoMangna" />
                <meta name="description" content="Um site mangas e novels, ainda em desenvolvimento." />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://mangawebsitenextv2.vercel.app/" />
                <meta property="og:title" content="MangoMangna" />
                <meta property="og:description" content="Um site mangas e novels, ainda em desenvolvimento." />
                <meta property="og:image" content="" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://mangawebsitenextv2.vercel.app/" />
                <meta property="twitter:title" content="MangoMangna" />
                <meta property="twitter:description" content="Um site mangas e novels, ainda em desenvolvimento." />
                <meta property="twitter:image" content="" />
            </Head>

            <div className={styles.container} >
                <Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
                <div className={styles.mainArea} style={{ marginLeft: menuOpen ? '240px' : 'auto', marginRight: menuOpen ? '0px' : 'auto' }}>
                    <Aside menuOpen={menuOpen} />

                    <main className={styles.contentArea}>
                        <Trending mangas={mangas} title='Em alta' icon={<TrendUp size={24} color={theme.iconColor} />} />

                        <div className={styles.following} >
                            <div className={styles.followingIcon}>
                                <FileArrowUp size={24} color={theme.iconColor} />
                                <p>Novos Lançamentos</p>
                            </div>
                            <div className={styles.followingItems}>
                                {mangas.map((manga) => {
                                    return <FollowingItem key={manga.id} title={manga.title} imgUrl={manga.image_url} desc={manga.sinopse} href={`/manga/${manga.slug}`} lastChapter={manga.chapters[0]} />
                                })}

                            </div>
                        </div>

                    </main>
                </div>
            </div>

            <Footer />
        </div>
    )
}

type Props = {
    mangas: {
        created_at: any;
        chapters: any[];
        id: string;
        title: string;
        slug: string;
        sinopse: string;
        origin_id: string | null;
        views: number;
        image_url: string;
        is_manga: boolean | null;
        genres: GenresOnMangas[];
        origin: Origin | null;
    }[]
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    let raw = await prisma.manga.findMany({ include: { chapters: true, genres: true, origin: true } });
    let mangas = JSON.parse(JSON.stringify(raw))
    mangas.map((manga: any) => manga.chapters.sort((a: Chapter, b: Chapter) => {
        if (parseInt(a.slug.split('-')[a.slug.split('-').length - 1]) - parseInt(b.slug.split('-')[b.slug.split('-').length - 1]) > 0) {
            return -1
        } else {
            return 1
        }
    }))

    return {
        props: { mangas },
        revalidate: 60 * 60
    }
}

export default Home