import axios from "axios";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Aside } from "../../../src/components/LayoutComponents/Aside";
import { ChapterInfoComponent } from "../../../src/components/GeneralComponents/ChapterInfoComponent";
import { Footer } from "../../../src/components/LayoutComponents/Footer";
import { Header } from "../../../src/components/LayoutComponents/Header";
import { MangaStatus } from "../../../src/components/GeneralComponents/MangaStatus";
import { useThemeContext } from "../../../src/contexts/colorContext/hook";
import { getCloudflareUrl } from "../../../src/libs/frontServices/getCloudflareUrl";
import prisma from '../../../src/libs/backServices/prisma'
import styles from '../../../styles/Manga.module.css'
import { getTimePast } from "../../../src/libs/frontServices/timeUtils";
import { MangaIncludingChaptersScanGenresAndGenreAndOrigin } from "../../../src/types/FrontTypes/MangaAndChapters/MangaIncludingChaptersScanGenresAndGenreAndOrigin";
import nookies from 'nookies';
import { ChapterWithScan } from "../../../src/types/FrontTypes/MangaAndChapters/ChapterWithScan";
import { useRouter } from "next/router";

const Manga = ({ manga }: Props) => {
    const { theme } = useThemeContext();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const volumes: number[] = [];
    manga.chapters.map((chapter) => {
        if (volumes.indexOf(chapter.volume) === -1)
            volumes.push(chapter.volume)
    });
    const [activeVolume, setActiveVolume] = useState(volumes[0]);
    const [chapterList, setChapterList] = useState<ChapterWithScan[]>([]);
    const [sorted, setSorted] = useState(false);
    const [editSinopse, setEditSinopse] = useState(false);
    const [sinopse, setSinopse] = useState(manga.sinopse);
    const [editGenres, setEditGenres] = useState(false);
    const [genres, setGenres] = useState(manga.genres.map(genre => genre.genre.slug).join(';'));
    const [editStatus, setEditStatus] = useState(false);
    const [status, setStatus] = useState(manga.status);
    const [editAuthor, setEditAuthor] = useState(false);
    const [author, setAuthor] = useState(manga.author || 'Takashi');

    useEffect(() => {
        const addView = async () => {
            let formData = new FormData();
            formData.append('views', 'true');
            formData.append('manga_id', manga.id)
            await axios.put(`/api/manga`, formData)
        }
        addView()
    }, [])

    const handleClick = () => {
        let copy = [...manga.chapters];
        if (!sorted && chapterList.length === 0) {
            copy.sort((a, b) => {
                if (parseInt(a.slug.split('-')[a.slug.split('-').length - 1]) - parseInt(b.slug.split('-')[b.slug.split('-').length - 1]) > 0) {
                    return 1
                } else {
                    return -1
                }
            })

            setChapterList(copy);
        }

        setActiveVolume(volumes[volumes.length - 1]);
        setSorted(!sorted);
    }

    const handleEditItem = async (name: 'sinopse' | 'genres' | 'status' | 'author') => {
        const actions = {
            sinopse: { name: 'sinopse', data: sinopse },
            genres: { name: 'genres', data: genres },
            status: { name: 'status', data: status },
            author: { name: 'author', data: author }
        }

        const data = new FormData();
        data.append(actions[name].name, actions[name].data);
        data.append('manga_slug', manga.slug);
        data.append('manga_id', manga.id);
        const { authorization } = nookies.get(null);
        data.append('authorization', authorization)
        let result = await axios.patch('/api/manga', data);
        if (result.status === 200) {
            router.reload();
        }

    }
    return (
        <div className={styles.container} style={{ backgroundColor: theme.primaryColor, color: theme.fontColor }} >
            <Head>
                <title>{`${manga.title} - Tenki Mangas`}</title>
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
                                <section className={styles.upperArea}>
                                    <div className={styles.contentImg}>
                                        <img src={getCloudflareUrl(manga.image_url)} alt="" />
                                        <div className={styles.ghost}></div>
                                    </div>
                                    <article className={styles.mangaInfo}>
                                        {!editStatus &&
                                            <>
                                                <MangaStatus title='status' mangaStatus={manga.status === 'ongoing' ? 'Em lançamento' : 'Completo'} icon='status' />
                                                <button
                                                    style={{ marginLeft: '12px', width: 'fit-content', display: 'inline-block' }}
                                                    onClick={() => setEditStatus(true)}
                                                >
                                                    Editar
                                                </button>
                                            </>
                                        }
                                        {editStatus &&
                                            <>
                                                <select name="" id="" required onChange={e => setStatus(e.target.value)}>
                                                    <option value=""></option>
                                                    <option value="ongoing">Em Lançamento</option>
                                                    <option value="complete">Finalizado</option>
                                                </select>
                                                <button
                                                    style={{ marginLeft: '12px', width: 'fit-content', display: 'inline-block' }}
                                                    onClick={() => handleEditItem('status')}
                                                >
                                                    Confirmar
                                                </button>
                                            </>
                                        }
                                        <MangaStatus title='Último lançamento' mangaStatus={getTimePast(manga.created_at)} icon='lastRelease' />
                                        {!editAuthor &&
                                            <>
                                                <MangaStatus title='Author' mangaStatus={manga.author ? manga.author : 'John Doe'} icon='author' />
                                                <button
                                                    style={{ marginLeft: '12px', width: 'fit-content', display: 'inline-block' }}
                                                    onClick={() => setEditAuthor(true)}
                                                >
                                                    Editar
                                                </button>
                                            </>
                                        }
                                        {editAuthor &&
                                            <>
                                                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
                                                <button
                                                    style={{ marginLeft: '12px', width: 'fit-content', display: 'inline-block' }}
                                                    onClick={() => handleEditItem('author')}
                                                >
                                                    Confirmar
                                                </button>
                                            </>
                                        }
                                        <div className={styles.genres}>
                                            {!editGenres &&
                                                <>
                                                    {manga.genres.map(genre => {
                                                        return (
                                                            <Link href={`/mangas/${genre.genre.slug}`} key={genre.id} >
                                                                <a className={styles.genre}>{genre.genre.name}</a>
                                                            </Link>
                                                        )
                                                    })}
                                                    <button
                                                        style={{ marginLeft: '12px' }}
                                                        onClick={() => setEditGenres(true)}
                                                    >
                                                        Editar
                                                    </button>
                                                </>
                                            }
                                            {editGenres &&
                                                <>
                                                    <input type="text" value={genres} onChange={e => setGenres(e.target.value)} style={{ width: '400px' }} />
                                                    <button
                                                        style={{ marginLeft: '12px' }}
                                                        onClick={() => handleEditItem('genres')}
                                                    >
                                                        Confirmar
                                                    </button>
                                                </>
                                            }
                                        </div>
                                    </article>
                                </section>
                                <div className={styles.sinopse}>
                                    {!editSinopse &&
                                        <>
                                            {manga.sinopse}
                                            <button
                                                style={{ marginLeft: '12px' }}
                                                onClick={() => setEditSinopse(true)}
                                            >Editar</button>
                                        </>
                                    }
                                    {editSinopse &&
                                        <>
                                            <textarea cols={80} rows={10} value={sinopse} onChange={e => setSinopse(e.target.value)}></textarea>
                                            <button
                                                style={{ marginLeft: '12px' }}
                                                onClick={() => handleEditItem('sinopse')}
                                            >
                                                Confirmar
                                            </button>
                                        </>
                                    }
                                </div>
                            </main>



                        </div>
                        <section className={styles.chapters}>
                            <button className={styles.filters} onClick={handleClick}>
                                {sorted ? 'Crescente' : 'Decrescente'}
                            </button>
                            {!sorted && volumes.map((i: number) => {
                                return (
                                    <ChapterInfoComponent
                                        key={i}
                                        volume={i}
                                        chapters={manga.chapters.map((chapter) => {
                                            if (chapter.volume === i) {
                                                return chapter
                                            }
                                        })}
                                        activeVolume={activeVolume}
                                        setActiveVolume={setActiveVolume}
                                    />
                                )
                            })}
                            {sorted && volumes.reverse() && volumes.map((i: number) => {
                                return (
                                    <ChapterInfoComponent
                                        key={i}
                                        volume={i}
                                        chapters={chapterList.map((chapter: any) => {
                                            if (chapter.volume === i) {
                                                return chapter
                                            }
                                        })}
                                        activeVolume={activeVolume}
                                        setActiveVolume={setActiveVolume}
                                    />
                                )
                            })}
                        </section>
                    </div>
                </div>
            </div >

            <Footer />
        </div >
    )
}

type Props = {
    manga: MangaIncludingChaptersScanGenresAndGenreAndOrigin
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { authorization } = nookies.get(ctx);
    if (authorization !== process.env.COOKIE as string) {
        return {
            redirect: {
                destination: '/admin/login',
                permanent: false
            }
        }
    }
    let { slug } = ctx.params!;
    let raw = await prisma.manga.findFirst({
        where: {
            slug: slug as string
        },
        include: {
            chapters: {
                include: {
                    scan: true
                }
            },
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
            origin: true
        }
    })
    let manga: MangaIncludingChaptersScanGenresAndGenreAndOrigin = JSON.parse(JSON.stringify(raw))
    manga.chapters.sort((a, b) => {
        if (parseInt(a.slug.split('-')[a.slug.split('-').length - 1]) - parseInt(b.slug.split('-')[b.slug.split('-').length - 1]) > 0) {
            return -1
        } else {
            return 1
        }
    })

    return {
        props: {
            manga
        }
    }
}

export default Manga;