import styles from "./entry.module.scss";

export const content= [
    "Lorem ipsum sit dolor amet!",

    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt purus in rhoncus elementum. Mauris ac mi eget velit commodo laoreet non sit amet lorem. Maecenas dignissim laoreet bibendum. Integer varius tempor ex. Etiam aliquet bibendum volutpat. Donec sed felis turpis. Vivamus finibus ex vitae scelerisque dictum. Maecenas rhoncus mi risus, in rhoncus orci euismod et. Vestibulum id tellus in sapien condimentum commodo. Sed elementum magna at nibh congue, a maximus augue consectetur. Maecenas ultrices leo vitae turpis bibendum, eu ultrices dui dapibus."
]

export default function Entry() {
    return (
        <article className={styles.Entry}>
            <h1>{content[0]}</h1>
            <h2>{content[1]}</h2>
            <h3>{content[2]}</h3>
            <p>{content[3]}</p>
        </article>
    )
}