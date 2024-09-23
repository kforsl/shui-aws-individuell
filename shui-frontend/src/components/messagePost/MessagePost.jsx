import { Link } from "react-router-dom";
import "./messagePost.css";

const addClickedPostToStorage = (post) => {
    sessionStorage.setItem(
        "clickedPost",
        JSON.stringify({
            createdAt: post.createdAt,
            id: post.id,
            text: post.text,
            username: post.username,
        })
    );
};

export default function MessagePost({ post }) {
    return (
        <article className='post'>
            <Link
                className='post__link'
                to={`/${post.id}`}
                onClick={() => addClickedPostToStorage(post)}
            >
                <p className='post__date'>{post.createdAt}</p>
                <h2 className='post__text'>{post.text}</h2>
                <h3 className='post__user'> - {post.username}</h3>
            </Link>
        </article>
    );
}
