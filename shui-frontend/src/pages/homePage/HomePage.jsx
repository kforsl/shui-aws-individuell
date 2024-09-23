import { useState, useEffect } from "react";
import "./homePage.css";
import { getMessages } from "../../functions/api";
import Footer from "../../components/footer/Footer";
import MessagePost from "../../components/messagePost/MessagePost";
import filter from "../../assets/ion_filter.svg";

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
        getMessages(setMessages, setAllMessages);
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
                    alt='filter icon'
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
