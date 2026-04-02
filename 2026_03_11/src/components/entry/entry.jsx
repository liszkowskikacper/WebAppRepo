import styles from "./entry.module.scss";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function PostEntry() {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: post, isLoading: postLoading, error: postErr } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/posts/${id}`);
            return res.json();
        }
    });

    const { data: author, isLoading: authorLoading, error: authorErr } = useQuery({
        queryKey: ["user", post?.userId],
        enabled: Boolean(post?.userId),
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/users/${post.userId}`);
            return res.json();
        }
    });

    const { data: comments, isLoading: commentsLoading, error: commentsErr } = useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/posts/${id}/comments`);
            return res.json();
        }
    });

    if (postLoading || authorLoading || commentsLoading) {
        return <p>Ładowanie danych...</p>;
    }

    if (postErr || authorErr || commentsErr) {
        return <p>Wystąpił błąd</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        await fetch(`http://localhost:3000/posts/${id}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: form.get("name"),
                email: form.get("email"),
                body: form.get("content")
            })
        });

        queryClient.invalidateQueries(["comments", id]);
        e.target.reset();
    };

    return (
        <article className={styles.Entry}>
            <header>
                <h1>{post.title}</h1>
                <h3>{author?.name}</h3>
            </header>

            <p>{post.body}</p>

            <section>
                <h3>Komentarze</h3>

                {comments?.map(({ id, name, email, body }) => (
                    <div key={id}>
                        <p><strong>{name}</strong></p>
                        <small>{email}</small>
                        <p>{body}</p>
                    </div>
                ))}
            </section>

            <section>
                <h3>Dodaj komentarz</h3>

                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="imię" />
                    <input type="email" name="email" placeholder="email" />
                    <textarea name="content" placeholder="treść" />
                    <button type="submit">Wyślij</button>
                </form>
            </section>
        </article>
    );
}
