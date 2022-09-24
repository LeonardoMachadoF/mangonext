import Link from "next/link"
import styles from './styles.module.css'

type Props = {
    icon: React.ReactNode,
    name: string,
    path?: string,
    color: string;
}

export const AsideNavItems = ({ icon, name, path = '', color }: Props) => {
    return (
        <div className={styles.navItem} style={{ color: color }}>
            {icon}
            <Link href={`/${path}`}>{name}</Link>
        </div>
    )
}