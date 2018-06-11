'use strict';

const AWS = require('aws-sdk');

const MESSAGES_TABLE = process.env.MESSAGES_TABLE;
const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;

// DocumentClient makes it so we don't need to specify types 
// in the objects we put/get
const dynamoDb = new AWS.DynamoDB.DocumentClient({
  api_version: '2012-08-10',
  region: AWS_DEPLOY_REGION
});


/**
 * Create a chat message in our database.
 * 
 * Endpoint: /messages
 * Method: POST
 * @param {object} event 
 * @param {object} context 
 */
module.exports.createChatMessage = async (event, context) => {

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
    messageId,
    datePosted,
    room,
    userId,
    message
  } = _parsed;

  const params = {
    TableName: MESSAGES_TABLE,
    Item: {
      messageId,
      datePosted,
      room,
      userId,
      message
    },
  };

  try {
    const data = await dynamoDb.put(params).promise();
    console.log(`createChatMessage data=${JSON.stringify(data)}`);
    return {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
  } catch (error) {
    console.log(`createChatMessage ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `Could not create message: ${error.stack}`
    };
  }

};

/**
 * Get a message by it's ID.
 * 
 * Endpoint: /messages?messageId=xxxx
 * Method: GET
 * @param {object} event 
 * @param {object} context 
 */
module.exports.getMessage = async (event, context) => {

  if (!("queryStringParameters" in event) || !(event.queryStringParameters)) {
    return {
      statusCode: 404,
      error: `No Query String`
    };
  }
  if (!(event.queryStringParameters.messageId)) {
    return {
      statusCode: 404,
      error: `No messageId in Query String: ${JSON.stringify(event.queryStringParameters)}`
    };
  }

  const params = {
    TableName: MESSAGES_TABLE,
    Key: {
      messageId: event.queryStringParameters.messageId
    }
  };

  try {
    const data = await dynamoDb.get(params).promise();
    if (!data || typeof data === 'undefined' || !data.Item) {
      console.log(`getMessage did not find messageId=${event.queryStringParameters.messageId}`);
      return {
        statusCode: 404,
        error: `Could not find message for messageId: ${event.queryStringParameters.messageId}`
      }
    } else {
      console.log(`getMessage data=${JSON.stringify(data.Item)}`);
      return {
        statusCode: 200,
        body: JSON.stringify(data.Item)
      };
    }
  } catch (error) {
    console.log(`getMessage ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `Could not retrieve message: ${error.stack}`
    };
  }
};

/**
 * Get the messages in a room.
 * 
 * Endpoint: /messages/room/{room}
 * Method: GET
 * @param {object} event 
 * @param {object} context 
 */
module.exports.getRoomMessages = async (event, context) => {

  if (!("pathParameters" in event) || !(event.pathParameters)) {
    return {
      statusCode: 404,
      error: `No pathParameters`
    };
  }
  if (!(event.pathParameters.room)) {
    return {
      statusCode: 404,
      error: `No room in Query String: ${JSON.stringify(event.pathParameters)}`
    };
  }

  const params = {
    TableName: MESSAGES_TABLE,
    IndexName: "roomIndex",
    KeyConditionExpression: "room = :room",
    ExpressionAttributeValues: {
      ":room": event.pathParameters.room
    }
  };

  try {
    const data = await dynamoDb.query(params).promise();
    console.log(`getRoomMessages data=${JSON.stringify(data.Items)}`);
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch (error) {
    console.log(`getRoomMessages ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `Could not query messages with room ${event.pathParameters.room}: ${error.stack}`
    };
  }
};

/**
 * Get messages by userId.
 * 
 * Endpoint: /messages/user/{userId}
 * Method: GET
 * @param {object} event 
 * @param {object} context 
 */
module.exports.getUserMessages = async (event, context) => {
  if (!("pathParameters" in event) || !(event.pathParameters)) {
    return {
      statusCode: 404,
      error: `No pathParameters`
    };
  }
  if (!(event.pathParameters.userId)) {
    return {
      statusCode: 404,
      error: `No userId in Query String: ${JSON.stringify(event.pathParameters)}`
    };
  }

  const params = {
    TableName: MESSAGES_TABLE,
    IndexName: "userIndex",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.pathParameters.userId
    }
  };

  try {
    const data = await dynamoDb.query(params).promise();
    console.log(`getUserMessages data=${JSON.stringify(data.Items)}`);
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch (error) {
    console.log(`getUserMessages ERROR=${error.stack}`);
    return {
      statusCode: 400,
      error: `Could not query messages with userId ${event.pathParameters.userId}: ${error.stack}`
    };
  }
};