const { sendResponse, sendError } = require("../../responses");
const { db } = require("../../services/dynamoDb");

exports.handler = async (event) => {
    try {
        const { username } = event.pathParameters;
        const { Items } = await db.scan({
            TableName: "shui-message-board-db",
        });
        const usersItems = Items.filter(item => item.username === username);
        return sendResponse(200, usersItems);
    } catch (error) {
        return sendError(404, error.message);
    }
}