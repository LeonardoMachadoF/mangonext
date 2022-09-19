import Link from "next/link"
import { useThemeContext } from "../../contexts/colorContext/context"
import styles from './styles.module.css'

type Props = {
    icon: React.ReactNode,
    name: string,
    path?: string
}

export const AsideNavItems = ({ icon, name, path = '' }: Props) => {
    const { theme } = useThemeContext()
    return (
        <div className={styles.navItem} >
            {icon}
            <Link href={`/${path}`}>{name}</Link>
        </div>
    )
}