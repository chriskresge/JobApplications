'use strict';
const {
    DocumentClient
} = require('aws-sdk/clients/dynamodb');

const dynamoClient = new DocumentClient();


module.exports = {
    get: (params) => dynamoClient.get(params).promise(),
    put: (params) => dynamoClient.put(params).promise(),
    del: (params) => dynamoClient.delete(params).promise(),
    query: (params) => dynamoClient.query(params).promise()
};