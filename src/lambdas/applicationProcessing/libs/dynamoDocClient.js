const AWS = require('aws-sdk');

const dynamoClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    get: (params) => dynamoClient.get(params).promise(),
    put: (params) => dynamoClient.put(params).promise(),
    del: (params) => dynamoClient.delete(params).promise(),
    query: (params) => dynamoClient.query(params).promise()
};