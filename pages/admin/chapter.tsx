import { GetServerSideProps } from "next"
import { FormEvent, useRef, useState } from "react"
import nookies from 'nookies';
import axios from "axios";
import { Input } from "../../src/components/GeneralComponents/Input";
import Link from "next/link";
import { Manga, Scan } from "@prisma/client";
import prisma from '../../src/libs/backServices/prisma';

const Chapter = ({ mangas, scans }: Props) => {
    const [chapterTitle, setChapterTitle] = useState('');
    const [chapterVolume, setChapterVolume] = useState(0);
    const [chapterChapter, setChapterChapter] = useState(0);
    const [mangaSlug, setMangaSlug] = useState('')
    const [scan, setScan] = useState('');
    const inputRef = useRef<any>(null);
    const [promises, setPromises] = useState<{ url: string, data: FormData }[]>([]);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let arrayOfFiles: any = [...inputRef.current.files]

        let size = arrayOfFiles.reduce((acc: number, at: any) => acc + parseInt(at.size), 0) / 1000000;
        const half = Math.ceil(arrayOfFiles.length / 2);
        if (size > 1) {
            handleUpload((arrayOfFiles.slice(0, half)))
            handleUpload((arrayOfFiles.slice(half)))
        } else {
            handleUpload(arrayOfFiles)
        }



        // for (let i in inputRef.current.files) {
        //     data.append('imgs', arrayOfFiles[i]);
        // }

        // let data = new FormData();
        // data.append('volume', chapterVolume.toString())
        // data.append('chapter', chapterChapter.toString())
        // data.append('manga_slug', mangaSlug)
        // data.append('scan', scan)
        // data.append('title', chapterTitle)
        // let { authorization } = nookies.get(null);
        // data.append('cookie', authorization)
        // let res = await axios.post("/api/chapter", data).catch(e => { console.log(e); setLoading(false); });
        // setPromises((state) => [...state, { url: "/api/chapter", data }])

        // if (res && res.data) {
        // setLoading(false);
        //     setChapterTitle('');
        //     setChapterChapter(parseInt(`${chapterChapter}`) + parseInt('1'));
        //     alert("success!" + res.data.newChapter.slug)
        // }
    }

    const handleUpload = async (arrayOfFiles: any) => {
        let size = arrayOfFiles.reduce((acc: number, at: any) => acc + parseInt(at.size), 0) / 1000000;
        const half = Math.ceil(arrayOfFiles.length / 2);
        if (size > 4) {
            handleUpload((arrayOfFiles.slice(0, half)))
            handleUpload((arrayOfFiles.slice(half)))
        } else {
            let data = new FormData();

            for (let i in inputRef.current.files) {
                data.append('imgs', arrayOfFiles[i]);
            }

            data.append('volume', chapterVolume.toString())
            data.append('chapter', chapterChapter.toString())
            data.append('manga_slug', mangaSlug)
            data.append('scan', scan)
            data.append('title', chapterTitle)
            let { authorization } = nookies.get(null);
            data.append('cookie', authorization)

            setPromises((state) => [...state, { url: "/api/chapter", data }])

            // let res = await axios.post("/api/chapter", data).catch(e => { console.log(e); setLoading(false); });
            // if (res && res.data) {
            //     setLoading(false);
            //     setChapterTitle('');
            //     setChapterChapter(parseInt(`${chapterChapter}`) + parseInt('1'));
            // } else {
            //     alert('Unexpected Error!')
            // }
        }
    }

    const finish = async () => {
        for (let i in promises) {
            let res = await axios.post(promises[i].url, promises[i].data);
            if (res.data.error) {
                alert('Error: Unauthorized');
                return;
            }
        }
        alert('success')
    }
    return (
        <div style={{ color: 'white' }}>
            <div >
                <form >
                    <Input
                        type='text'
                        title='Titúlo do Capitulo'
                        value={chapterTitle}
                        onChange={setChapterTitle}
                    />
                    <Input
                        type='number'
                        title='Volume'
                        value={chapterVolume}
                        onChange={setChapterVolume}
                    />
                    <Input
                        type='number'
                        title='Capítulo'
                        value={chapterChapter}
                        onChange={setChapterChapter}
                    />


                    <div>
                        <span style={{ marginRight: '80px' }}>Manga: </span>
                        <select name="" id="" onChange={e => setMangaSlug(e.target.value)}>
                            <option value=""></option>
                            {mangas.map((manga) => {
                                return (
                                    <option key={manga.id} value={manga.slug}>
                                        {manga.title}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '60px', height: '60px' }}>
                        <span>Scan</span>
                        <select name="" id="" style={{ width: '200px' }} onChange={e => setScan(e.target.value)}>
                            <option value=""></option>
                            {scans.map((scan) => {
                                return (
                                    <option key={scan.id} value={scan.slug} >
                                        {scan.name}
                                    </option>
                                )
                            })}
                        </select>
                        <span style={{ marginTop: '-40px', }}>
                            <Input value={scan} onChange={setScan} title='' type='text' placeholder='scan-exemplo' />
                        </span>
                    </div>


                    <span >
                        Páginas: <input style={{ marginLeft: '70px' }} required ref={inputRef} type="file" multiple />
                    </span>



                    <button onClick={(e: any) => handleSubmit(e)}>Enviar</button>
                </form>
                <button onClick={finish}>Finalizar</button>
                <div style={{ marginTop: '40px' }}>
                    <Link href='/' >
                        <a>
                            Ir para criação de manga
                        </a>
                    </Link>
                </div>
            </div>
        </div >
    )
}

type Props = {
    mangas: Manga[],
    scans: Scan[]
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

    let raw = await prisma.manga.findMany({ orderBy: { title: 'asc' } });
    let mangas = JSON.parse(JSON.stringify(raw))
    let scans = await prisma.scan.findMany({ orderBy: { name: 'asc' } })

    return {
        props: { mangas, scans }
    }
}

export default Chapter 