import styles from "./entry.module.scss";

export const entryData = {
    title: "Half Life 3 zapowiedziany!",
    category: "Gaming",
    subtitle:
        "Po wielu latach Valve w końcu stanęło na wysokości zadania.",
    content: `
    Lorem ipsum sit dolor maet
  `
};

export default function Entry() {
    const { title, category, subtitle, content } = entryData;

    return (
        <article className={styles.Entry}>
            <h1>{title}</h1>
            <h2>{category}</h2>
            <h3>{subtitle}</h3>
            <p>{content}</p>
        </article>
    );
}