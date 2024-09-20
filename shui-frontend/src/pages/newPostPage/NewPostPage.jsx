import { useState } from "react";
import "./newPostPage.css";
import axios from "axios";

export default function NewPostPage() {
    const postMessage = async (e) => {
        e.preventDefault();

        await axios.post(
            "https://dtuf936zdi.execute-api.eu-north-1.amazonaws.com/api/messages",
            {
                text: newPostText,
                username: postUsername,
            }
        );

        window.location.href = window.location.origin;
    };

    const [newPostText, setNewPostText] = useState("");
    const [postUsername, setPostUsername] = useState("");

    return (
        <form className='form'>
            <section className='form__post-container'>
                <textarea
                    onChange={(e) => setNewPostText(e.target.value)}
                    className='form__post-input'
                    name=''
                    id=''
                    placeholder='Lägg till ny...... '
                ></textarea>
            </section>
            <section className='form__bottom-container'>
                <input
                    onChange={(e) => setPostUsername(e.target.value)}
                    className='form__username-input'
                    type='text'
                    placeholder='Användarnamn'
                />
                <button className='form__submit-btn' onClick={postMessage}>
                    {" "}
                    Publicera{" "}
                </button>
            </section>
        </form>
    );
}
