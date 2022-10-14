import Link from 'next/link';
import styles from './styles.module.css'

type Props = {
    title: string;
    timePast: string;
    img: string;
    mangaSlug: string;
}

export const TrendingItem = ({ title, timePast, img, mangaSlug }: Props) => {
    return (
        <div className={styles.trendingItem}>
            <div
                className={styles.imageTrending}
                style={{
                    backgroundImage: `url("${img}")`
                }}>
            </div>

            <div className={styles.trendingInfo}>
                <Link href={`/manga/${mangaSlug}`} className={styles.trendingTitle}>{title}</Link>
                <div className={styles.trendingSmall}>
                    <small>{timePast}</small>
                    <small>Línguas 🇰🇷</small>
                </div>
            </div>
        </div>
    )
}