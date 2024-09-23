const { sendResponse, sendError } = require("../../responses")
const { db } = require("../../services/dynamoDb");

exports.handler = async (event) => {
    try {
        const { id } = event.pathParameters;

        const { Items } = await db.query({
            TableName: "shui-message-board-db",
            KeyConditionExpression: '#id = :id',
            ExpressionAttributeValues: {
                ':id': id,
            },
            ExpressionAttributeNames: {
                '#id': 'id',
            },
        })

        if (Items.length < 1) {
            return sendError(404, "No item with that id.")
        }

        await db.delete({
            TableName: "shui-message-board-db",
            Key: {
                id
            }
        })
        return sendResponse(200, "DeleteMessage")
    } catch (error) {
        return sendError(404, error.message)
    }
}