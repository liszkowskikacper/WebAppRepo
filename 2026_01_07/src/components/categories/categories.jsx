import styles from './categories.module.scss';

export default function Categories(){
    return (
        <section className={styles.Categories}>
            <h1>Kategorie</h1>
            <ul>
                <li>Sport</li>
                <li>Technologia</li>
                <li>Wiadomości z kraju</li>
                <li>Wiadomości z świata</li>
            </ul>
        </section>
    )
}