

async function validateRequest(event) {
    if (!event.body) {

    }
}

async function processEventParams(event) {
    let reqParams = new Object();
    let valid = false;
    if (event.body) {
        let body = JSON.parse(event.body);
        if (body.Name && body.Questions && typeof(body.Name) == "string" && Array.isArray(body.Questions)) {
            reqParams = { ...reqParams, ...body };
            valid = true;
        } 
    }
    if (!valid) {
        throw new Error("Bad Request");
    }
    if (event.pathParameters) {
        reqParams = { ...reqParams, ...event.pathParameters };  
    }
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
