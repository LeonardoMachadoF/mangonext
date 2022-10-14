import { CloudArrowDown, PencilSimple, SquaresFour } from 'phosphor-react'
import styles from './styles.module.css'

type Props = {
    title: string;
    mangaStatus: string;
    icon: 'status' | 'lastRelease' | 'author';
}

export const MangaStatus = ({ title, mangaStatus, icon }: Props) => {
    const iconsOptions = {
        status: <SquaresFour size={26} />,
        lastRelease: <CloudArrowDown size={24} />,
        author: <PencilSimple weight="fill" size={24} />
    }
    return (
        <div className={styles.status}>

            <span className={styles.icon}>
                {iconsOptions[icon]}
            </span>
            <p>{title[0].toUpperCase() + title.substring(1)}: {mangaStatus}</p>

        </div>
    )
}