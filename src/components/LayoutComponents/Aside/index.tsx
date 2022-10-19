import { Bookmarks, Cards, CaretDown, ChatText, ClockCounterClockwise, Fire, Funnel, Gear, Heart, House, List, Question } from 'phosphor-react'
import { useThemeContext } from '../../../contexts/colorContext/hook';
import { AsideNavItems } from '../../GeneralComponents/AsideNavItems'
import { ToogleButton } from '../../GeneralComponents/ToogleButton';
import styles from './styles.module.css'

type Props = {
    menuOpen: boolean;
    absolute?: boolean;
}

export const Aside = ({ menuOpen, absolute }: Props) => {
    const { theme } = useThemeContext();

    return (
        <nav className={styles.aside} style={{ backgroundColor: theme.terciaryColor, left: menuOpen ? '0px' : '-240px', position: absolute ? 'absolute' : 'fixed', borderRadius: absolute ? '30px' : '0' }}>
            <div className={styles.navItems}>
                <AsideNavItems icon={<House size={24} color={theme.iconColor} />} name={'Home'} color={theme.fontColor} />
                <AsideNavItems icon={<Fire size={24} color={theme.iconColor} />} name={'Populares'} color={theme.fontColor} />
                <AsideNavItems icon={<Cards size={24} color={theme.iconColor} />} name={'Recomendações'} color={theme.fontColor} />
                <AsideNavItems icon={<Funnel size={24} color={theme.iconColor} weight="bold" />} name={'Pesquisa Avançada'} color={theme.fontColor} />
                <div className={styles.theme}>
                    <ToogleButton /> <small>Tema: {theme.theme}</small>
                </div>
            </div>
        </nav >
    )
}