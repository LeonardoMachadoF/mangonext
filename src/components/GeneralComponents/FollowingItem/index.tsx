import { Chapter, Scan } from '@prisma/client'
import Link from 'next/link'
import { useEffect } from 'react'
import { useThemeContext } from '../../../contexts/colorContext/hook'
import { getCloudflareUrl } from '../../../libs/frontServices/getCloudflareUrl'
import { getTimePast } from '../../../libs/frontServices/timeUtils'
import styles from './styles.module.css'

type Props = {
    title: string;
    desc: string;
    imgUrl: string;
    href: string;
    lastChapter?: (Chapter & {
        scan: Scan | null;
    }) | null
}

export const FollowingItem = ({ title, desc, imgUrl, href, lastChapter }: Props) => {
    const { theme } = useThemeContext();
    let lastChapterDate: string = '';
    if (lastChapter) {
        lastChapterDate = getTimePast(lastChapter.created_at)
    }


    return (
        <div className={styles.followingItem} style={{ backgroundColor: theme.secondaryColor }}>
            <div className={styles.img}>
                <img src={getCloudflareUrl(imgUrl)} alt="" />
            </div>
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
                        <small style={{ marginLeft: '10px' }}>{lastChapter?.scan ? lastChapter.scan.name : 'Random Scans'}</small>
                    </div>
                    <small>{lastChapterDate}</small>
                </div>
            </div>
        </div >
    )
}