import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <nav className={styles.Navbar}>
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/artykuł">Artykuł</Link></li>
                <li><Link to="/kat">Kategorie</Link></li>
                <li><Link to="/post">Posty</Link></li>
            </ul>
        </nav>
    )
}