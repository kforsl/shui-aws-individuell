import axios from "axios";

const baseUrl = "https://dtuf936zdi.execute-api.eu-north-1.amazonaws.com";

export const submitForm = (e, postText, postUser, postId) => {
    e.preventDefault();

    const clickedSubmitBtnId = e.nativeEvent.submitter.id;

    if (clickedSubmitBtnId.includes("add")) {
        postMessage(postText, postUser);
    } else if (clickedSubmitBtnId.includes("change")) {
        putMessage(postText, postUser, postId);
    } else if (clickedSubmitBtnId.includes("delete")) {
        deleteMessage(postId);
    }
};

export const getMessages = async (setMessages, setAllMessages) => {
    const response = await axios.get(`${baseUrl}/api/messages`);
    setAllMessages(response.data.data);
    setMessages(response.data.data);
};

const postMessage = async (postText, postUser) => {
    await axios.post(`${baseUrl}/api/messages`, {
        text: postText,
        username: postUser,
    });

    window.location.href = window.location.origin;
};

const putMessage = async (postText, postUser, postId) => {
    await axios.put(`${baseUrl}/api/messages/${postId}`, {
        text: postText,
        username: postUser,
    });

    window.location.href = window.location.origin;
};

const deleteMessage = async (postId) => {
    await axios.delete(`${baseUrl}/api/messages/${postId}`);

    window.location.href = window.location.origin;
};
