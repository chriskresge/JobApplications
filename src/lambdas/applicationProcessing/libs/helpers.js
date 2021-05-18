const AWS = require('aws-sdk');
const dynamoDocClient = require('./dynamoDocClient');
const {
    get,
    query,
    put,
    del
} = require('./dynamoDocClient');
const tableName = 'JobApplicationsTable';

async function processEventParams(event) {
    console.log('Validating Request');
    let reqParams = new Object();
    let valid = false;

    // validate request
    if (event.body) {
        let body = JSON.parse(event.body);
        if (event.path.includes('criteria')) {
            body.Name = 'AnswerList';
        }
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
    console.log('Request valid');

    return reqParams;
}

async function buildResponse(res, status = 200) {
    console.log('building HTTP Response')
    let response = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "content-type": "application/json",
            connection: "keep-alive"
        },
        statusCode: status,
        multiValueHeaders: {},
        isBase64Encoded: false,
    };
    response.body = JSON.stringify(res);
    console.log("response:", JSON.stringify(response));
    return response;
}

async function getCorrectAnswers(job) {
    console.log('Retrieving correct answers from DynamoDB');
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
    console.log('Checking application answers');
    const {
        Questions,
        job
    } = reqParams;
    const answerList = await getCorrectAnswers(job);
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

async function saveApplication(application) {
    console.log('saving application to DynamoDB');
    let params = {
        TableName: tableName,
        Item: application
    };
    let result = 'Application Saved';
    try {
        let res = await put(params);
        if (res == 1) {
            result = "Application saved";
        } else {
            result = "Error saving your application; please submit again";
            console.log("Error writing to DynamoDB");
        }
        return result;
    } catch (e) {
        console.log('Error writing to DynamoDB:', e);
        return (e);
    }
}
async function getAcceptedApplicants(job) {
    let params = {
        KeyConditionExpression: 'job = :hkey',
        FilterExpression: 'appStatus = accepted',
        ExpressionAttributeValues: {
            ':hkey': job
        },
        TableName: tableName
    };
    let result = await query(params);
    return result;
}

module.exports = {
    buildResponse: (res, status) => buildResponse(res, status),
    processEventParams: (event) => processEventParams(event),
    checkAnswers: (reqParams) => checkAnswers(reqParams),
    getAcceptedApplicants: (job) => getAcceptedApplicants(job),
    saveApplication: (application) => saveApplication(application)
}