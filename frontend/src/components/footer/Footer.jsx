import NavBarFooter from "./components/navBarFooter/NavBarFooter";
import './footer.module.css'

function Footer() {
    return (
        <footer>
            <NavBarFooter/>
            <a href="" className="margin-l-footer">Политика обработки персональных данных</a>
            <select className="margin-l-footer">
                <option>RU</option>
            </select>
            <span className="margin-l-footer">© Company 2021</span>
        </footer>
    )
}

export default Footer