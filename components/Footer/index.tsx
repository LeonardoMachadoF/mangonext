import { Copyright } from 'phosphor-react'
import { useThemeContext } from '../../contexts/colorContext/context'
import styles from './styles.module.css'

export const Footer = () => {
    const { theme } = useThemeContext();
    return (
        <footer className={styles.footer} style={{ backgroundColor: theme.secondaryColor }}>
            <Copyright size={24} color="#fff" />
            <small>2022 sitemanga - V1.1.2</small>
        </footer>
    )
}