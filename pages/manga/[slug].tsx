import { Chapter, GenresOnMangas, Manga, Origin, Scan } from "@prisma/client";
import axios from "axios";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { CloudArrowDown, PencilSimple, SquaresFour } from "phosphor-react";
import { useEffect, useState } from "react";
import { Aside } from "../../components/Aside";
import { ChapterInfoComponent } from "../../components/ChapterInfoComponent";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { useThemeContext } from "../../contexts/colorContext/hook";
import prisma from '../../src/libs/prisma'
import styles from '../../styles/Manga.module.css'

const Manga = ({ manga }: Props) => {
    const { theme } = useThemeContext();
    const [menuOpen, setMenuOpen] = useState(false);
    let lastRelease = new Date(manga.chapters[0].created_at);
    let today = new Date(Date.now());
    const volumes: number[] = [];
    manga.chapters.map((chapter: Chapter) => {
        if (volumes.indexOf(chapter.volume) === -1)
            volumes.push(chapter.volume)
    });
    const [activeVolume, setActiveVolume] = useState(volumes[0]);

    useEffect(() => {
        const addView = async () => {
            let formData = new FormData();
            formData.append('views', 'true');
            formData.append('manga_id', manga.id)
            await axios.put(`/api/manga`, formData)
        }
        addView()
    }, [])
    return (
        <div className={styles.container} style={{ backgroundColor: theme.primaryColor, color: theme.fontColor }} >
            <Head>
                <title>{`${manga.title} - Mango Mangna`}</title>
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

            <div className={styles.main} >
                <Header setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
                <div className={styles.mainArea} style={{ marginLeft: menuOpen ? '240px' : 'auto', marginRight: menuOpen ? '0px' : 'auto' }}>
                    <Aside menuOpen={menuOpen} />

                    <div className={styles.mangaContentAndChapters}>
                        <div className={styles.contentArea}>
                            <nav className={styles.backNav}>
                                {manga.is_manga ? 'Mangas' : 'Novels'} » {manga.title}
                            </nav>
                            <main className={styles.contentMain}>
                                <div className={styles.upperArea}>
                                    <div className={styles.contentImg}>
                                        <img src={manga.image_url} alt="" />
                                    </div>
                                    <div className={styles.mangaInfo}>
                                        <div className={styles.status}>

                                            <span className={styles.icon}>
                                                <SquaresFour size={26} />
                                            </span>
                                            <p>Status: {manga.status === 'ongoing' ? 'Em lançamento' : 'Completo'}</p>

                                        </div>
                                        <div className={styles.status}>

                                            <span className={styles.icon}>
                                                <CloudArrowDown size={24} />
                                            </span>
                                            <p>Último lançamento: {((today.getTime() - lastRelease.getTime()) / 1000 / 60 / 60).toFixed(0)} Horas Atrás</p>
                                        </div>
                                        <div className={styles.status}>

                                            <span className={styles.icon}>
                                                <PencilSimple weight="fill" size={24} />
                                            </span>
                                            <p>Autor: {manga.author ? manga.author : 'John Doe'}</p>
                                        </div>
                                        <div className={styles.genres}>
                                            {manga.genres.map(genre => {
                                                return (
                                                    <div key={genre.id} className={styles.genre}>
                                                        {genre.genre.name}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.sinopse}>
                                    {manga.sinopse}
                                </div>
                            </main>



                        </div>
                        <section className={styles.chapters}>
                            {volumes.map((i: number) => {
                                return (
                                    <ChapterInfoComponent
                                        key={i}
                                        volume={i}
                                        chapters={manga.chapters.map((chapter: Chapter) => {
                                            if (chapter.volume === i) {
                                                return chapter
                                            }
                                        })}
                                        today={today}
                                        mangaScan={manga.scan?.name}
                                        activeVolume={activeVolume}
                                        setActiveVolume={setActiveVolume}
                                    />
                                )
                            })}
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

type Props = {
    manga: (Manga & {
        chapters: Chapter[];
        origin: Origin | null;
        scan: Scan | null;
        status: string;
        genres: (GenresOnMangas & {
            genre: {
                slug: string;
                name: string;
            };
        })[]

    })
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     let { slug } = ctx.query;
//     let raw = await prisma.manga.update({
//         where: {
//             slug: slug as string
//         },
//         data: {
//             views: { increment: 1 }
//         },
//         include: {
//             chapters: true,
//             genres: {
//                 include: {
//                     genre: {
//                         select: {
//                             name: true,
//                             slug: true
//                         }
//                     }
//                 }
//             },
//             origin: true,
//             scan: true
//         }
//     })
//     let manga = JSON.parse(JSON.stringify(raw))
//     manga.chapters.sort((a: Chapter, b: Chapter) => {
//         if (parseInt(a.slug.split('-')[a.slug.split('-').length - 1]) - parseInt(b.slug.split('-')[b.slug.split('-').length - 1]) > 0) {
//             return -1
//         } else {
//             return 1
//         }

//     })

//     manga.status = 'ongoing'
//     return {
//         props: {
//             manga
//         }
//     }
// }



export const getStaticPaths: GetStaticPaths = async () => {
    let slugs = await prisma.manga.findMany({ select: { slug: true } });
    let paths: { params: { slug: string } }[] = []
    slugs.map(i => paths.push({ params: { slug: i.slug } }))

    return {
        paths: paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    let { slug } = ctx.params!;
    let raw = await prisma.manga.findFirst({
        where: {
            slug: slug as string
        },
        include: {
            chapters: true,
            genres: {
                include: {
                    genre: {
                        select: {
                            name: true,
                            slug: true
                        }
                    }
                }
            },
            origin: true,
            scan: true
        }
    })
    let manga = JSON.parse(JSON.stringify(raw))
    manga.chapters.sort((a: Chapter, b: Chapter) => {
        if (parseInt(a.slug.split('-')[a.slug.split('-').length - 1]) - parseInt(b.slug.split('-')[b.slug.split('-').length - 1]) > 0) {
            return -1
        } else {
            return 1
        }

    })

    manga.status = 'ongoing'
    return {
        props: {
            manga,
            revalidate: 60 * 60 * 2
        }
    }
}

export default Manga;