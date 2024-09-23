const { sendResponse, sendError } = require("../../responses")
const { db } = require("../../services/dynamoDb");

exports.handler = async (event) => {
    try {
        const { id } = event.pathParameters;
        const { text, username } = JSON.parse(event.body)
        if (!text || !username) {
            return sendError(404, "Missing required fields: text, username")
        }

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

        await db.update({
            TableName: "shui-message-board-db",
            Key: {
                id
            },
            ReturnValues: "ALL_NEW",
            UpdateExpression: "set #DYNOBASE_text = :text, #DYNOBASE_username = :username",
            ExpressionAttributeNames: {
                "#DYNOBASE_text": "text",
                "#DYNOBASE_username": "username"
            },
            ExpressionAttributeValues: {
                ":text": text,
                ":username": username,
            },
        })
        return sendResponse(200)
    } catch (error) {
        return sendError(404, error.message)
    }
}