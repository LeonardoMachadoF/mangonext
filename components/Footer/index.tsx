import { Copyright } from 'phosphor-react'
import styles from './styles.module.css'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Copyright size={24} color="#c4c4c4" />
            <small>2022 sitemanga - V1.1.2</small>
        </footer>
    )
}