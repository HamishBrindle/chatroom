'use strict';

const AWS = require('aws-sdk');

const ROOMS_TABLE = process.env.ROOMS_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;

// DocumentClient makes it so we don't need to specify types 
// in the objects we put/get
const dynamoDb = new AWS.DynamoDB.DocumentClient({
    api_version: '2012-08-10',
    region: AWS_DEPLOY_REGION
});


/**
 * Create a chat room in our database.
 * 
 * Endpoint: /rooms
 * Method: POST
 * @param {object} event 
 * @param {object} context 
 */
module.exports.createChatRoom = async (event, context) => {

    let _parsed;
    try {
        _parsed = JSON.parse(event.body);
    } catch (err) {
        console.error(`Could not parse requested JSON ${event.body}: ${err.stack}`);
        return {
            statusCode: 500,
            error: `Could not parse requested JSON: ${err.stack}`
        };
    }

    const {
        roomId,
        roomName
    } = _parsed;

    const params = {
        TableName: ROOMS_TABLE,
        Item: {
            roomId,
            roomName
        },
        ConditionExpression: "attribute_not_exists(roomId)",
    };

    try {
        const data = await dynamoDb.put(params).promise();
        console.log(`createChatRoom data=${JSON.stringify(data)}`);
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item)
        };
    } catch (error) {
        console.log(`createChatRoom ERROR=${error.stack}`);
        return {
            statusCode: 400,
            error: `Could not create room: ${error.stack}`
        };
    }

}


/**
 * Create a chat room in our database.
 * 
 * Endpoint: /rooms
 * Method: GET
 * @param {object} event 
 * @param {object} context 
 */
module.exports.getChatRooms = async (event, context) => {

    const params = {
        TableName: ROOMS_TABLE,
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        console.log(`getChatRooms data=${JSON.stringify(data.Items)}`);
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        console.log(`getChatRooms ERROR=${error.stack}`);
        return {
            statusCode: 400,
            error: `Could not get all the rooms: ${error.stack}`
        };
    }

}