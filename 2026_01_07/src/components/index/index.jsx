import { content } from "../entry/entry.jsx";
import {Link} from "react-router-dom";
import styles from "./index.module.scss";

export default function Main(){
    return (
        <main className={styles.Index}>
            <h1>Strona główna</h1>
            <br/>
            <h2>Artykuł</h2>
            <article>
                <Link to = "/artykuł">
                    <h4>{content[0]}</h4>
                    <p>{content[2]}</p>
                </Link>
            </article>
        </main>
    )
}