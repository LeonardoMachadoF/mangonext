import styles from './styles.module.css'

type Props = {
    title: string;
    timePast: string;
    img: string
}

export const TrendingItem = ({ title, timePast, img }: Props) => {
    return (
        <div className={styles.trendingItem}>
            <div
                className={styles.imageTrending}
                style={{
                    backgroundImage: `url("${img}")`
                }}>
            </div>

            <div className={styles.trendingInfo}>
                <div className={styles.trendingTitle}>{title}</div>
                <div className={styles.trendingSmall}>
                    <small>{timePast}</small>
                    <small>Línguas 🇰🇷</small>
                </div>
            </div>
        </div>
    )
}