import "./messagePost.css";

export default function MessagePost({ post }) {
    const func = () => {
        sessionStorage.setItem(
            "clickedPost",
            JSON.stringify({
                createdAt: post.createdAt,
                id: post.id,
                text: post.text,
                username: post.username,
            })
        );

        window.location.href = post.id;
    };

    return (
        <article onClick={func}>
            <p>{post.createdAt}</p>
            <h2>{post.text}</h2>
            <h3> - {post.username}</h3>
        </article>
    );
}
