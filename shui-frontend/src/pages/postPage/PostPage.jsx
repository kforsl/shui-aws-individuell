import { useEffect, useState } from "react";
import "./postPage.css";
import axios from "axios";
import { submitForm } from "../../functions/api";

export default function PostPage() {
    const [postText, setPostText] = useState("");
    const [postUsername, setPostUsername] = useState("");
    const [postId, setPostId] = useState("");

    useEffect(() => {
        const { id, text, username } = JSON.parse(
            sessionStorage.getItem("clickedPost")
        );
        setPostText(text);
        setPostUsername(username);
        setPostId(id);
    }, []);

    return (
        <form
            className='postForm'
            onSubmit={(e) => submitForm(e, postText, postUsername, postId)}
        >
            <section className='postForm__post-container'>
                <textarea
                    onChange={(e) => setPostText(e.target.value)}
                    className='postForm__post-input'
                    name=''
                    id='changePost-text'
                    placeholder='Lägg till ny...... '
                    value={postText}
                    required
                ></textarea>
            </section>
            <section className='postForm__bottom-container'>
                <input
                    onChange={(e) => setPostUsername(e.target.value)}
                    className='postForm__username-input'
                    type='text'
                    id='changePost-user'
                    placeholder='Användarnamn'
                    value={postUsername}
                    required
                />
                <button className='postForm__submit-btn' id='changePost'>
                    Ändra meddelande
                </button>
                <button className='postForm__submit-btn' id='deletePost'>
                    Ta Bort
                </button>
            </section>
        </form>
    );
}
