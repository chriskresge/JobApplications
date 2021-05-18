'use strict';
module.exports = {
    tables: [
      {
        TableName: `JobApplicationsTable`,
        KeySchema: [{AttributeName: 'job', KeyType: 'HASH'},{AttributeName: 'Name', KeyType: 'RANGE'}],
        AttributeDefinitions: [{AttributeName: 'job', AttributeType: 'S'},{AttributeName: 'Name', AttributeType: 'S'}],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
      }
    ],
  };