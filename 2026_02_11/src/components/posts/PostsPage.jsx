import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PostsPage = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["allPosts"],
        queryFn: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            return res.json();
        }
    });

    if (isLoading) {
        return <p>Trwa ładowanie...</p>;
    }

    if (isError) {
        return <p>Wystąpił błąd: {error.message}</p>;
    }

    return (
        <section>
            <h1>Posty</h1>

            {data?.length ? (
                data.map(({ id, title, body }) => (
                    <article key={id}>
                        <h3>
                            <Link to={`/post/${id}`}>{title}</Link>
                        </h3>
                        <p>{body.slice(0, 90)}...</p>
                    </article>
                ))
            ) : (
                <p>Brak postów</p>
            )}
        </section>
    );
};

export default PostsPage;
