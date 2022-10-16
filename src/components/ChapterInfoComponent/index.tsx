import { Chapter } from "@prisma/client"
import Link from "next/link";
import { ArrowDown } from "phosphor-react";
import { getTimePast } from "../../libs/timeUtils"
import styles from './styles.module.css'
type Props = {
    mangaScan?: string;
    chapters: (Chapter | undefined)[];
    volume: number;
    activeVolume: number;
    setActiveVolume: (volume: number) => void;
}

export const ChapterInfoComponent = ({ volume, mangaScan, chapters, activeVolume, setActiveVolume }: Props) => {
    const handleVolumeChange = () => {
        (volume === activeVolume)
            ? setActiveVolume(0)
            : setActiveVolume(volume)
    }
    return (
        <section style={{ transition: 'all ease 2s' }}>
            <div>
                <p onClick={handleVolumeChange} className={styles.volume}>Volume {volume} <ArrowDown size={14} weight='bold' /></p>
                {volume === activeVolume &&
                    <>
                        {chapters.map((chapter: (Chapter | undefined)) => {
                            if (chapter) {
                                return (
                                    <article key={chapter.id} className={styles.chapter}>
                                        <div className={styles.chapterTitleAndScan}>
                                            <Link href={`/capitulo/${chapter.slug}`}>
                                                <a>Cap.{chapter.chapter} - {chapter.title}</a>
                                            </Link>
                                            <span className={styles.scan}>{mangaScan && mangaScan}</span>
                                        </div>
                                        <div className={styles.chapterRelease}>
                                            {getTimePast(chapter.created_at)}
                                        </div>
                                    </article>
                                )
                            }
                        })}
                    </>
                }
            </div>
        </section>
    )
}