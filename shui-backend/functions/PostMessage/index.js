const { sendResponse, sendError } = require("../../responses")
const { v4: uuid } = require("uuid")
const { db } = require("../../services/dynamoDb");

exports.handler = async (event) => {
    try {
        const { text, username } = JSON.parse(event.body)
        if (!text || !username) {
            return sendError(404, "Missing required fields: text, username")
        }
        const createdAt = new Date().toDateString();
        const id = uuid().substring(0, 8);
        await db.put({
            TableName: "shui-message-board-db",
            Item: {
                id,
                username,
                text,
                createdAt
            }
        })
        return sendResponse(200)
    } catch (error) {
        return sendError(404, error.message)
    }
}