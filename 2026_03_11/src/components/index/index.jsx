import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useQuery } from "@tanstack/react-query";

export function HomePage() {
    const { data: posts, isLoading, isError, error } = useQuery({
        queryKey: ["postsList"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/posts");
            return res.json();
        }
    });

    if (isLoading) return <p>Wczytywanie...</p>;

    if (isError) return <p>Błąd: {error.message}</p>;

    return (
        <main className={styles.Index}>
            <header>
                <h1>Blog</h1>
                <h2>Ostatnie wpisy</h2>
            </header>

            <section className={styles.Container}>
                {posts?.length ? (
                    posts.map(({ id, title, body }) => (
                        <article key={id}>
                            <Link to={`/wpis/${id}`}>
                                <h3>{title}</h3>
                                <p>{body.slice(0, 60)}...</p>
                            </Link>
                        </article>
                    ))
                ) : (
                    <p>Brak wpisów</p>
                )}
            </section>
        </main>
    );
}
