const { sendResponse, sendError } = require("../../responses")
const { db } = require("../../services/dynamoDb");

exports.handler = async (event) => {
    try {
        const { Items } = await db.scan({
            TableName: "shui-message-board-db",
        })
        return sendResponse(200, Items)
    } catch (error) {
        return sendError(404, error.message)
    }
}