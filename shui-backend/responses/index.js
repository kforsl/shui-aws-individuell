const sendResponse = (status, data) => {
    return {
        statusCode: status,
        Headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ success: true, data })
    };
}

const sendError = (status, message) => {
    return {
        statusCode: status,
        Headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ success: false, message })
    };
}

module.exports = { sendResponse, sendError };