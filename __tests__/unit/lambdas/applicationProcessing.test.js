const lambda = require('../../../src/lambdas/applicationProcessing.js');
const missingQuestion = require('../../../events/missingQuestion.json'); 
const noJob = require('../../../events/noJob.json');
const nullApp = require('../../../events/nullApp.json');
const nullName = require('../../../events/nullName.json'); 
const nullQuestions = require('../../../events/nullQuestions.json');
const validApp = require('../../../events/validApp.json');
const wrongAnswer = require('../../../events/wrongAnswer.json');

// This includes all tests for applicationSubmission.handler()
describe('Test for applicationSubmisison', function () {
    // This test invokes applicationSubmission.handler() and compares the result 
    it('Returns bad request: null application', async () => {
        // Invoke applicationSubmission.handler()
        const result = await lambda.handler(nullApp);
        const expectedResult = 'Bad Request';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Returns bad request: null name', async () => {
        // Invoke applicationSubmission.handler()
        const result = await lambda.handler(nullName);
        const expectedResult = 'Bad Request';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Returns bad request: null questions', async () => {
        // Invoke applicationSubmission.handler()
        const result = await lambda.handler(nullQuestions);
        const expectedResult = 'Bad Request';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Rejects application: missing question', async () => {
        // Invoke applicationSubmission.handler()
        const result = await lambda.handler(missingQuestion);
        const expectedResult = 'Application Rejected';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Rejects application: wrong answer', async () => {
        // Invoke applicationSubmission.handler()
        const result = await lambda.handler(wrongAnswer);
        const expectedResult = 'Application Rejected';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });

    it('Accepts application: correct answers', async () => {
        // Invoke applicationSubmission.handler()
        const result = await lambda.handler(missingQuestion);
        const expectedResult = 'Application Accepted';
        // Compare the result with the expected result
        expect(result.body).toEqual(expectedResult);
    });   
});
