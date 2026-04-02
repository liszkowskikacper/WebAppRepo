import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PostPage = () => {
    const { id } = useParams();

    const { data: postData, isLoading: loadingPost } = useQuery({
        queryKey: ["singlePost", id],
        queryFn: async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            return res.json();
        }
    });

    const { data: authorData, isLoading: loadingAuthor } = useQuery({
        queryKey: ["author", postData?.userId],
        enabled: Boolean(postData?.userId),
        queryFn: async () => {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/users/${postData.userId}`
            );
            return res.json();
        }
    });

    const { data: commentList, isFetching: fetchingComments } = useQuery({
        queryKey: ["postComments", id],
        queryFn: async () => {
            const res = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${id}/comments`
            );
            return res.json();
        }
    });

    if (loadingPost) {
        return <p>Trwa pobieranie posta...</p>;
    }

    return (
        <section>
            <header>
                <h1>{postData.title}</h1>

                {!loadingAuthor && authorData && (
                    <div>
                        <p><strong>{authorData.name}</strong></p>
                        <small>{authorData.email}</small>
                    </div>
                )}
            </header>

            <article>
                <p>{postData.body}</p>
            </article>

            <div>
                <h2>Komentarze</h2>

                {fetchingComments && <p>Wczytywanie...</p>}

                {commentList?.length ? (
                    commentList.map(({ id, name, email, body }) => (
                        <div key={id}>
                            <p><b>{name}</b> | {email}</p>
                            <p>{body}</p>
                        </div>
                    ))
                ) : (
                    !fetchingComments && <p>Brak komentarzy</p>
                )}
            </div>
        </section>
    );
};

export default PostPage;
