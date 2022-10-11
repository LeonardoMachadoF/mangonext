import Link from 'next/link'
import { useEffect } from 'react'
import { useThemeContext } from '../../contexts/colorContext/hook'
import styles from './styles.module.css'

type Props = {
    title: string;
    desc: string;
    imgUrl: string;
    href: string;
    lastChapter: any;
}

export const FollowingItem = ({ title, desc, imgUrl, href, lastChapter }: Props) => {
    const { theme } = useThemeContext();
    let lastChapterDate = 0;
    let now = new Date(Date.now());
    if (lastChapter) {
        let newDate = new Date(lastChapter.created_at);
        lastChapterDate = newDate.getTime();
        lastChapterDate = ((now.getTime() - lastChapterDate) / 1000 / 60 / 60)
    }


    return (
        <div className={styles.followingItem} style={{ backgroundColor: theme.secondaryColor }}>
            <img src={imgUrl} alt="" />
            <div className={styles.followingInfo}>
                <Link href={href}>{title}</Link>
                <div className={styles.desc}>
                    {desc.length > 300 ? `${desc.substring(0, 300)}...` : desc}
                </div>
                <div className={styles.followingSubInfo}>
                    <div>
                        {lastChapter &&
                            <Link href={`/capitulo/${lastChapter.slug}`}>
                                <a style={{ fontSize: '14px' }}>
                                    Vol.{lastChapter.volume > 9 ? lastChapter.volume : `0${lastChapter.volume}`}, Capítulo {lastChapter.chapter > 9 ? lastChapter.chapter : ` 0${lastChapter.chapter}`}
                                </a>
                            </Link>
                        }
                        <small style={{ marginLeft: '10px' }}>Amadeus Scans</small>
                    </div>
                    <small>{(lastChapterDate / 60 * 100).toFixed(0)} {(lastChapterDate / 60 * 100) >= 2 ? 'horas' : 'hora'} atrás</small>
                </div>
            </div>
        </div >
    )
}