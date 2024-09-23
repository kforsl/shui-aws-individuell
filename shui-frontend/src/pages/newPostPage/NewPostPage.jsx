import { useState } from "react";
import "./newPostPage.css";
import { submitForm } from "../../functions/api";

export default function NewPostPage() {
    const [newPostText, setNewPostText] = useState("");
    const [postUsername, setPostUsername] = useState("");

    return (
        <form
            className='newPostForm'
            onSubmit={(e) => submitForm(e, newPostText, postUsername)}
        >
            <section className='newPostForm__post-container'>
                <textarea
                    onChange={(e) => setNewPostText(e.target.value)}
                    className='newPostForm__post-input'
                    placeholder='Lägg till ny...... '
                ></textarea>
            </section>
            <section className='newPostForm__bottom-container'>
                <input
                    onChange={(e) => setPostUsername(e.target.value)}
                    className='newPostForm__username-input'
                    type='text'
                    placeholder='Användarnamn'
                />
                <button className='newPostForm__submit-btn' id='addPost'>
                    Publicera
                </button>
            </section>
        </form>
    );
}
