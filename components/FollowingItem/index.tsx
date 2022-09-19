import Link from 'next/link'
import { useEffect } from 'react'
import { useThemeContext } from '../../contexts/colorContext/context'
import styles from './styles.module.css'

type Props = {
    manga?: any
}

export const FollowingItem = ({ manga }: Props) => {
    const { theme, setTheme } = useThemeContext();

    return (
        <div className={styles.followingItem} style={{ backgroundColor: theme.secondaryColor }}>
            <img src={`https://www.asurascans.com/wp-content/uploads/2022/08/resource.jpeg`} alt="" />
            <div className={styles.followingInfo}>
                <Link href='/'>{manga ? manga.title : 'Shadowless Night'}</Link>
                <div className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, laudantium sit adipisci delectus unde consectetur sint fugit odio pariatur, aperiam aspernatur libero ab dolor eius error officia reprehenderit asperiores ut?
                </div>
                <div className={styles.followingSubInfo}>
                    <div>
                        <small>Vol.2 Cap. 11</small>
                        <small>Amadeus Scans</small>
                    </div>
                    <small>3 horas atrás</small>
                </div>
            </div>
        </div>
    )
}