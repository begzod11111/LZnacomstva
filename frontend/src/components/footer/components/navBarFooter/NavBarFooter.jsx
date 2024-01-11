import classes from './navBarFooter.module.css'

function NavBarFooter() {
    return (
        <nav className={classes.navFooter}>
            <a href="">О нас</a>
            <a href="">Поддержка</a>
            <a href="">Советы</a>
            <a href="">Контакты</a>
            <a href="">Правила оплаты</a>
        </nav>
    )
}

export default NavBarFooter