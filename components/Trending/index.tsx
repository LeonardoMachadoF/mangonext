import { CaretLeft, CaretRight, TrendUp } from 'phosphor-react'
import { useState } from 'react';
import { TrendingItem } from '../TrendingItem'
import styles from './styles.module.css'

type Props = {
    title: string,
    icon: React.ReactNode
}

export const Trending = ({ title, icon }: Props) => {

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
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                    <TrendingItem />
                </div>
                <CaretLeft className={styles.arrowCarrousel} onClick={handleLeftClick} size={24} color="#fff" />
                <CaretRight className={styles.arrowCarrousel} onClick={handleRightClick} size={24} color="#fff" style={{ right: '0px' }} />
            </div>
        </div>
    )
}