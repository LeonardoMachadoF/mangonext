import { Chapter, GenresOnMangas, Manga, Origin } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import prisma from '../../src/libs/prisma'

const Manga = ({ manga }: Props) => {
    return (
        <div style={{ color: 'white' }}>

        </div>
    )
}

type Props = {
    manga: (Manga & {
        chapters: Chapter[];
        origin: Origin | null;
        genres: (GenresOnMangas & {
            genre: {
                slug: string;
                name: string;
            };
        })[];
    })
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    let { slug } = ctx.query;
    let raw = await prisma.manga.update({
        where: {
            slug: slug as string
        },
        data: {
            views: { increment: 1 }
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
            origin: true
        }
    })
    let manga = JSON.parse(JSON.stringify(raw))
    manga.chapters.sort((a: any, b: any) => a.title > b.title ? 1 : -1)

    return {
        props: {
            manga
        }
    }
}


export default Manga;