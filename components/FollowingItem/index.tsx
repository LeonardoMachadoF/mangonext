import Link from 'next/link'
import { useEffect } from 'react'
import styles from './styles.module.css'

type Props = {
    manga?: any
}

export const FollowingItem = ({ manga }: Props) => {
    useEffect(() => {
        if (manga) {
            console.log(manga.imageUrl)
        }
    }, [])
    return (
        <div className={styles.followingItem}>
            <img src={`${manga ? manga.imageUrl : 'https://www.asurascans.com/wp-content/uploads/2022/08/resource.jpeg'}`} alt="" />
            <div className={styles.followingInfo}>
                <Link href='/'>{manga ? manga.title : 'Shadowless Night'}</Link>
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