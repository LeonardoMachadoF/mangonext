import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { FileArrowUp, Lightbulb, Star, TrendUp } from 'phosphor-react'
import { useEffect } from 'react'
import { Aside } from '../components/Aside'
import { FollowingItem } from '../components/FollowingItem'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Trending } from '../components/Trending'
import { useThemeContext } from '../contexts/colorContext/context'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
    const { theme, setTheme } = useThemeContext();
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
                <Header />
                <div className={styles.mainArea} >
                    <Aside />
                    <main className={styles.contentArea} >
                        <Trending title='Em alta' icon={<TrendUp size={24} color="#fff" />} />

                        <div className={styles.following} >
                            <div className={styles.followingIcon}>
                                <FileArrowUp size={24} color="#fff" />
                                <p>Novos Lançamentos</p>
                            </div>
                            <div className={styles.followingItems}>
                                <FollowingItem />
                                <FollowingItem />
                                <FollowingItem />
                                <FollowingItem />
                                <FollowingItem />
                                <FollowingItem />
                            </div>
                        </div>

                        <Trending title='Talvez você possa gostar desses' icon={<Lightbulb size={24} color="#fff" />} />

                    </main>
                </div>
            </div>

            <Footer />
        </div>
    )
}


export default Home
