import Link from "next/link"
import styles from './styles.module.css'

type Props = {
    icon: React.ReactNode,
    name: string,
    path?: string
}

export const AsideNavItems = ({ icon, name, path = '' }: Props) => {
    return (
        <div className={styles.navItem}>
            {icon}
            <Link href={`/${path}`}>{name}</Link>
        </div>
    )
}