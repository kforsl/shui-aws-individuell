import { useEffect, useState } from "react";
import "./postPage.css";
import axios from "axios";

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

    const putMessage = async (e) => {
        e.preventDefault();

        await axios.put(
            `https://dtuf936zdi.execute-api.eu-north-1.amazonaws.com/api/messages/${postId}`,
            {
                text: postText,
                username: postUsername,
            }
        );

        window.location.href = window.location.origin;
    };

    const deleteMessage = async (e) => {
        e.preventDefault();

        await axios.delete(
            `https://dtuf936zdi.execute-api.eu-north-1.amazonaws.com/api/messages/${postId}`
        );

        window.location.href = window.location.origin;
    };

    return (
        <form className='form'>
            <section className='form__post-container'>
                <textarea
                    onChange={(e) => setPostText(e.target.value)}
                    className='form__post-input'
                    name=''
                    id='changePost-text'
                    placeholder='Lägg till ny...... '
                    value={postText}
                ></textarea>
            </section>
            <section className='form__bottom-container'>
                <input
                    onChange={(e) => setPostUsername(e.target.value)}
                    className='form__username-input'
                    type='text'
                    id='changePost-user'
                    placeholder='Användarnamn'
                    value={postUsername}
                />
                <button className='form__submit-btn' onClick={putMessage}>
                    Ändra meddelande
                </button>
                <button className='form__submit-btn' onClick={deleteMessage}>
                    Ta Bort
                </button>
            </section>
        </form>
    );
}
