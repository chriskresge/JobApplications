'use strict';
const {
    checkAnswers,
    getAcceptedApplicants,
    buildResponse,
    saveApplication,
    processEventParams
} = require("./libs/helpers");


module.exports.handler = async (event) => {
    let response, reqParams, results, test;
    try {
    
        //route requests
        if (event.path.includes('list')) {
            console.log('Retreiving all accepted applicants for job:', event.pathParameters.job);
            results = await getAcceptedApplicants(event.pathParameters.job);
        } else if (event.path.includes('criteria')) {
            reqParams = await processEventParams(event);
            results = await saveApplication(reqParams);
        } else {
            reqParams = await processEventParams(event);
            test = await checkAnswers(reqParams);
            reqParams.appStatus = test;
            reqParams.saveStatus = await saveApplication(reqParams);
            results = reqParams;
        }
        response = await buildResponse(results);
        return response;
    } catch (error) {
        if (error.message == "Bad Request") {
            response = await buildResponse(error, 400)
        } else {
            response = await buildResponse(error, 500)
        }
        return response;
    }
}