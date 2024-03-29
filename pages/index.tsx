import type { GetStaticProps } from 'next'
import Head from 'next/head'
import { FileArrowUp, TrendUp } from 'phosphor-react'
import { useState } from 'react'
import { Aside } from '../src/components/LayoutComponents/Aside'
import { FollowingItem } from '../src/components/GeneralComponents/FollowingItem'
import { Footer } from '../src/components/LayoutComponents/Footer'
import { Header } from '../src/components/LayoutComponents/Header'
import { Trending } from '../src/components/GeneralComponents/Trending'
import styles from '../styles/Home.module.css'
import prisma from '../src/libs/backServices/prisma';
import { useThemeContext } from '../src/contexts/colorContext/hook'
import { MangaIncludingChaptersScanGenresAndOrigin } from '../src/types/FrontTypes/MangaAndChapters/MangaIncludingChaptersScanGenresAndOrigin'

const Home = ({ mangas }: Props) => {
    const { theme } = useThemeContext();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={styles.homePage} style={{ backgroundColor: theme.primaryColor, color: theme.fontColor }} >
            <Head>
                <title>Tenki Mangas</title>
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
                                    return <FollowingItem key={manga.id} title={manga.title} imgUrl={manga.image_url} desc={manga.sinopse} href={`/titulo/${manga.slug}`} lastChapter={manga.chapters[0] ? manga.chapters[0] : null} />
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
    mangas: MangaIncludingChaptersScanGenresAndOrigin[]
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    let raw = await prisma.manga.findMany({ include: { chapters: { include: { scan: true }, take: 1, orderBy: { created_at: 'desc' } }, genres: true, origin: true } });
    let mangas = JSON.parse(JSON.stringify(raw))
    mangas.map((manga: MangaIncludingChaptersScanGenresAndOrigin) => manga.chapters.sort((a, b) => {
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

export default Home;