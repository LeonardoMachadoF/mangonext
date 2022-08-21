import { Bookmarks, Cards, CaretDown, ChatText, ClockCounterClockwise, Fire, Funnel, Gear, Heart, House, List, Question } from 'phosphor-react'
import { AsideNavItems } from '../AsideNavItems'
import styles from './styles.module.css'

export const Aside = () => {
    return (
        <nav className={styles.aside}>
            <div>
                <List size={24} color="#c4c4c4" weight="bold" />
            </div>
            <div className={styles.navItems}>
                <AsideNavItems icon={<House size={24} color="#c4c4c4" />} name={'Home'} />
                <AsideNavItems icon={<Fire size={24} color="#c4c4c4" />} name={'Populares'} />
                <AsideNavItems icon={<Heart size={24} color="#c4c4c4" weight="bold" />} name={'Favoritos'} />
                <AsideNavItems icon={<Bookmarks size={24} color="#c4c4c4" />} name={'Seguindo'} />
                <AsideNavItems icon={<Cards size={24} color="#c4c4c4" />} name={'Recomendações'} />
                <AsideNavItems icon={<Funnel size={24} color="#c4c4c4" weight="bold" />} name={'Pesquisa Avançada'} />
                <AsideNavItems icon={<ClockCounterClockwise size={24} color="#c4c4c4" />} name={'Histórico'} />
            </div>
            <div className={styles.updates}>
                <p>Atualizações</p>
                <AsideNavItems
                    icon={
                        <img
                            src="https://static3.mangalivre.net/capas/IupuZwHxqhbRBN--58d-xQ/765/capa.jpg"
                            alt="logoImg"
                            style={{ width: '24px', borderRadius: '50%', height: '24px' }} />
                    }
                    name={'Ore no Kouhai'}
                />
                <AsideNavItems
                    icon={
                        <img
                            src="https://static3.mangalivre.net/capas/IupuZwHxqhbRBN--58d-xQ/765/capa.jpg"
                            alt="logoImg"
                            style={{ width: '24px', borderRadius: '50%', height: '24px' }} />
                    }
                    name={'Ore no Kouhai'}
                />
                <AsideNavItems
                    icon={
                        <img
                            src="https://static3.mangalivre.net/capas/IupuZwHxqhbRBN--58d-xQ/765/capa.jpg"
                            alt="logoImg"
                            style={{ width: '24px', borderRadius: '50%', height: '24px' }} />
                    }
                    name={'Ore no Kouhai'}
                />
                <AsideNavItems
                    icon={
                        <img
                            src="https://static3.mangalivre.net/capas/IupuZwHxqhbRBN--58d-xQ/765/capa.jpg"
                            alt="logoImg"
                            style={{ width: '24px', borderRadius: '50%', height: '24px' }} />
                    }
                    name={'Ore no Kouhai'}
                />
                <AsideNavItems
                    icon={
                        <img
                            src="https://static3.mangalivre.net/capas/IupuZwHxqhbRBN--58d-xQ/765/capa.jpg"
                            alt="logoImg"
                            style={{ width: '24px', borderRadius: '50%', height: '24px' }} />
                    }
                    name={'Ore no Kouhai'}
                />
                <AsideNavItems icon={<CaretDown size={24} color="#c4c4c4" weight="bold" />} name={'Mostrar mais 5'} />
            </div>
            <div className={styles.navConfig}>
                <AsideNavItems icon={<Gear size={24} color="#c4c4c4" />} name={'Configurações'} />
                <AsideNavItems icon={<Question size={24} color="#c4c4c4" />} name={'Ajuda'} />
                <AsideNavItems icon={<ChatText size={24} color="#c4c4c4" />} name={'Enviar feedback'} />
            </div>
        </nav>
    )
}