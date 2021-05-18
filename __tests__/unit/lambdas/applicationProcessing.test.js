const lambda = require('../../../applicationProcessing.js');
const missingQuestion = require('../../../events/missingQuestion.json'); 
const noJob = require('../../../events/noJob.json');
const nullApp = require('../../../events/nullApp.json');
const nullName = require('../../../events/nullName.json'); 
const nullQuestions = require('../../../events/nullQuestions.json');
const validApp = require('../../../events/validApp.json');
const wrongAnswer = require('../../../events/wrongAnswer.json');
const {DocumentClient} = require('aws-sdk/clients/dynamodb');

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};

const ddb = new DocumentClient(config);
// This includes all tests for applicationProcessing.handler()
describe('Test for applicationProcessing', function () {
    // This test invokes applicationProcessing.handler() and compares the result 
    it('Returns bad request: null application', async () => {
        // Invoke applicationProcessing.handler()
        const result = await lambda.handler(nullApp);
        const expectedResult = 'Bad Request';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Returns bad request: null name', async () => {
        // Invoke applicationProcessing.handler()
        const result = await lambda.handler(nullName);
        const expectedResult = 'Bad Request';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Returns bad request: null questions', async () => {
        // Invoke applicationProcessing.handler()
        const result = await lambda.handler(nullQuestions);
        const expectedResult = 'Bad Request';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Rejects application: missing question', async () => {
        // Invoke applicationProcessing.handler()
        const result = await lambda.handler(missingQuestion);
        const expectedResult = 'Application Rejected';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Rejects application: wrong answer', async () => {
        // Invoke applicationProcessing.handler()
        const result = await lambda.handler(wrongAnswer);
        const expectedResult = 'Application Rejected';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Accepts application: correct answers', async () => {
        // Invoke applicationProcessing.handler()
        const result = await lambda.handler(missingQuestion);
        const expectedResult = 'Application Accepted';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });   
});
