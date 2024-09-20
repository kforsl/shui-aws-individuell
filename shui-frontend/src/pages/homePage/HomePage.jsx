import { useState } from "react";
import Footer from "../../components/footer/Footer";
import "./homePage.css";
import { useEffect } from "react";
import MessagePost from "../../components/messagePost/MessagePost";
import axios from "axios";
import filter from "../../assets/ion_filter.svg";

const getMessages = async (setAllMessages, setMessages) => {
    const response = await axios.get(
        "https://dtuf936zdi.execute-api.eu-north-1.amazonaws.com/api/messages"
    );
    setAllMessages(response.data.data);
    setMessages(response.data.data);
};

const sortMessages = async (messages, setMessages) => {
    setMessages([]);
    const sortedMessages = await messages.sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        if (timeA < timeB) return -1;
        if (timeA > timeB) return 1;
        return 0;
    });
    setMessages(sortedMessages);
};

export default function HomePage() {
    const [allMessages, setAllMessages] = useState([]);
    const [messages, setMessages] = useState([]);
    const [isFooterBgShowing, setIsFooterBgShowing] = useState(true);
    const [userFilterString, SetUserFilterString] = useState("");

    useEffect(() => {
        getMessages(setAllMessages, setMessages);
    }, []);

    useEffect(() => {
        setIsFooterBgShowing(messages.length === 0);
    }, [messages]);

    useEffect(() => {
        if (userFilterString.length < 1) {
            setMessages(allMessages);
        } else {
            const filterResponse = allMessages.filter((m) =>
                m.username.includes(userFilterString)
            );
            setMessages(filterResponse);
        }
    }, [userFilterString]);

    return (
        <>
            <section className='post__filter-container'>
                <input
                    className='post__filter-input'
                    type='text'
                    placeholder='username'
                    onChange={(e) => SetUserFilterString(e.target.value)}
                />
                <img
                    onClick={() => sortMessages(messages, setMessages)}
                    className='post__filter-icon'
                    src={filter}
                    alt='filter'
                />
            </section>
            <section className='post__container'>
                {messages.length > 0 ? (
                    messages.map((post, index) => {
                        return <MessagePost post={post} key={index} />;
                    })
                ) : (
                    <h1 className='post__empty-message'>
                        Du har inga meddelanden att visa.
                    </h1>
                )}
            </section>

            <Footer isBgShowing={isFooterBgShowing} />
        </>
    );
}
