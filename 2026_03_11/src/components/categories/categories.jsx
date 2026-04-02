import styles from './categories.module.scss';

export default function Categories(){
    return (
        <section className={styles.Categories}>
            <h1>Lista kategorii</h1>
            <ul>
                <li>Gaming</li>
                <li>Polityka krajowa</li>
                <li>Polityka międzynarodowa</li>
                <li>Technologia</li>
                <li>Sport</li>
            </ul>
        </section>
    )
}