import { GenresOnMangas, Origin } from '@prisma/client';
import { CaretLeft, CaretRight, TrendUp } from 'phosphor-react'
import { useState } from 'react';
import { TrendingItem } from '../TrendingItem'
import styles from './styles.module.css'
import { getTimePast } from '../../src/libs/timeUtils'

type Props = {
    title: string,
    icon: React.ReactNode,
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

export const Trending = ({ mangas, title, icon }: Props) => {

    const [marginLeft, setMarginLeft] = useState(0);
    const handleRightClick = () => {
        setMarginLeft(marginLeft - 150)
    }
    const handleLeftClick = () => {
        marginLeft >= 0 ? setMarginLeft(0) : setMarginLeft(marginLeft + 150)
    }

    return (
        <div className={styles.trending}>
            <div className={styles.trendText}>
                {icon}
                <p>{title}</p>
            </div>
            <div className={styles.trendingRow}>
                <div className={styles.carrousel} style={{ marginLeft: `${marginLeft}px` }}>
                    {mangas.map(manga => {
                        return (
                            <TrendingItem
                                key={manga.id}
                                title={manga.title}
                                timePast={getTimePast(manga.created_at)}
                                img={manga.image_url}
                                mangaSlug={manga.slug}
                            />
                        )
                    })}

                </div>
                <CaretLeft className={styles.arrowCarrousel} onClick={handleLeftClick} size={24} color="#fff" style={{ cursor: 'pointer' }} />
                <CaretRight className={styles.arrowCarrousel} onClick={handleRightClick} size={24} color="#fff" style={{ right: '0px', cursor: 'pointer' }} />
            </div>
        </div>
    )
}