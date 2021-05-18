const {
    checkAnswers,
    getAcceptedApplicants,
    buildResponse,
    saveApplication,
    processEventParams
} = require("./libs/helpers");

module.exports.handler = async (event, context) => {
    let response, reqParams, results, test;
    try {
        if (event.path.includes('list')) {
            results = await getAcceptedApplicants(event.pathParameters.job);
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