import styles from './styles.module.css'

export const TrendingItem = () => {
    return (
        <div className={styles.trendingItem}>
            <div className={styles.imageTrending} style={{ backgroundImage: 'url("https://www.asurascans.com/wp-content/uploads/2022/06/IObtainedaMythicItemCover04.png")' }}></div>

            <div className={styles.trendingInfo}>
                <div className={styles.trendingTitle}>I Obtained a Mythic Item</div>
                <div className={styles.trendingSmall}>
                    <small>11 horas atrás</small>
                    <small>Línguas 🇰🇷</small>
                </div>
            </div>
        </div>
    )
}