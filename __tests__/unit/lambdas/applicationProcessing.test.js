'use strict';
const lambda = require('../../../applicationProcessing.js');
const missingQuestion = require('../../../events/missingQuestion.json');
const nullApp = require('../../../events/nullApp.json');
const nullName = require('../../../events/nullName.json');
const nullQuestions = require('../../../events/nullQuestions.json');
const validApp = require('../../../events/validApp.json');
const wrongAnswer = require('../../../events/wrongAnswer.json');



// This includes all tests for applicationProcessing.handler()
describe('Test for applicationProcessing', function () {
    it('should insert item into table', async () => {
        await put({
            TableName: 'JobApplicationsTable',
            Item: {
                job: '1',
                Name: 'AnswerList',
                Questions: [
                    {"Id": "id1", "Question": "Do you have a reliable vehicle?", "Answer": "yes"},
                    {"Id": "id2", "Question": "Do you have a driver's license?","Answer": "yes"}
                ] 
            }
        }).promise();

        const {
            Item
        } = await ddb.get({
            TableName: 'JobApplicationsTable',
            Key: {
                job: '1'
            }
        }).promise();

        expect(Item).toEqual({
            job: '1',
            Name: 'AnswerList',
            Questions: [
                {"Id": "id1", "Question": "Do you have a reliable vehicle?", "Answer": "yes"},
                {"Id": "id2", "Question": "Do you have a driver's license?","Answer": "yes"}
            ] 
        });
    });

    // This test invokes applicationProcessing.handler() 
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
        const expectedResult = 'rejected';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Rejects application: wrong answer', async () => {
        // Invoke applicationProcessing.handler()
        const result = await lambda.handler(wrongAnswer);
        const expectedResult = 'rejected';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Accepts application: correct answers', async () => {
        // Invoke applicationProcessing.handler()
        const result = await lambda.handler(missingQuestion);
        const expectedResult = 'accepted';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });
});