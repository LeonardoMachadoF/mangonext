import Link from 'next/link'
import { useEffect } from 'react'
import { useThemeContext } from '../../contexts/colorContext/hook'
import styles from './styles.module.css'

type Props = {
    manga?: any;
    desc: string;
}

export const FollowingItem = ({ manga, desc }: Props) => {
    const { theme } = useThemeContext();

    return (
        <div className={styles.followingItem} style={{ backgroundColor: theme.secondaryColor }}>
            <img src={`https://www.asurascans.com/wp-content/uploads/2022/08/resource.jpeg`} alt="" />
            <div className={styles.followingInfo}>
                <Link href='/'>{manga ? manga.title : 'Shadowless Night'}</Link>
                <div className={styles.desc}>
                    {desc.length > 300 ? `${desc.substring(0, 300)}...` : desc}
                </div>
                <div className={styles.followingSubInfo}>
                    <div>
                        <small>Vol.2 Cap. 11</small>
                        <small>Amadeus Scans</small>
                    </div>
                    <small>3 horas atrás</small>
                </div>
            </div>
        </div >
    )
}