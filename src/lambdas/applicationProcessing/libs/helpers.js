const AWS = require('aws-sdk');
const {
    get,
    query,
    put,
    del
} = require('./dynamoDocClient');
const tableName = 'JobApplicationsTable';

async function processEventParams(event) {
    let reqParams = new Object();
    let valid = false;

    // validate request
    if (event.body) {
        let body = JSON.parse(event.body);
        if (body.Name && body.Questions && typeof (body.Name) == "string" && Array.isArray(body.Questions) && Array.length(body.Questions) > 0) {
            reqParams = {
                ...reqParams,
                ...body
            };
            valid = true;
        }
    }
    if (!valid) {
        throw new Error("Bad Request");
    }
    if (event.pathParameters) {
        reqParams = {
            ...reqParams,
            ...event.pathParameters
        };
    }

    // add date of application
    reqParams.date = new Date();

    // add application status
    reqParams.appStatus = 'received';

    return reqParams;
}

async function buildResponse(res, status = 200) {
    let response = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
            connection: "keep-alive"
        },
        statusCode: status,
        multiValueHeaders: {},
        isBase64Encoded: false,
        body: res,
    };
    return response;
}

async function getAnswers(job) {
    var params = {
        Key: {
            "job": job,
            "Name": "AnswerList"
        },
        TableName: tableName,
        AttributesToGet: "Questions"
    };
    var result = await get(params);
    console.log(`Question and Answers list for job:${job}:`, JSON.stringify(result));
    return result;
}

async function checkAnswers(reqParams) {
    const {
        Questions,
        job
    } = reqParams;
    const answerList = await getAnswers(job);
    if (Questions.length != answerList.length) {
        return 'rejected';
    }
    let solutions = {};
    for (const correct of answerList) {
        solutions[correct.Id] = correct.Answer;
    }
    for (const submission of Questions) {
        if (solutions[submission.Id] != submission.Answer) {
            return 'rejected';
        };
    }
    return 'accepted';

}
module.exports = {
    buildResponse: (res, status) => buildResponse(res, status),
    processEventParams: (event) => processEventParams(event),
    checkAnswers: (reqParams) => checkAnswers(reqParams)
}