# JobApplications API

The Job Applications API receives and stores employer criteria for minimum qualifications for a particular job, and uses that data to screen potential candidates. Prospective employees submit their applications to the API, which are then "graded" to ensure all questions are answered correctly. The application is accepted or rejected, and employers are able to access the applications of all passing applicants.

The API is built using node.js 14.x and is hosted on AWS Lambda, using API Gateway, DynamoDB, and CloudWatch for HTTP endpoint configuration, data persistence, and logging, respectively. 

# API Endpoints and Requests

A Postman Collection with example requests is here:
https://www.getpostman.com/collections/79f2b38ac57fe9b4ee0c

API Gateway Invoke URL:
https://j8oz69y9v0.execute-api.us-east-1.amazonaws.com/Prod/{job}/{endpoint}

## Endpoints:
To add solutions list (employer)
POST: https://j8oz69y9v0.execute-api.us-east-1.amazonaws.com/Prod/{job}/criteria

To submit application (employee)
POST: https://j8oz69y9v0.execute-api.us-east-1.amazonaws.com/Prod/{job}/submit

To retrieve passing applications (employer)
POST: https://j8oz69y9v0.execute-api.us-east-1.amazonaws.com/Prod/{job}/list

## AWS Auth
AWS Signature Credentialing is required. Credentials for a user with only API Gateway Invoke priviliges:
secretKey:"e252t8bazj8UguuJAk9cSceABD0GCKcdUooYVxLL",
accessKey:"AKIAWXLK5FM7KHTYERW2",
region:"us-east-1"

# JobApplications & SAM CLI: Build and Deploy Instructions From AWS

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

- `events` - Invocation events that you can use to invoke the function.
- `__tests__` - Unit tests for the application code. 
- `template.yml` - A template that defines the application's AWS resources.

Resources for this project are defined in the `template.yml` file in this project.

## Deploy the application

The AWS SAM CLI is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the AWS SAM CLI, you need the following tools:

* AWS SAM CLI - [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html).
* Node.js - [Install Node.js 14](https://nodejs.org/en/), including the npm package management tool.
* Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community).

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

* **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
* **AWS Region**: The AWS region you want to deploy your app to.
* **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
* **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modifies IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
* **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

## Use the AWS SAM CLI to build and test locally

Build your application by using the `sam build` command.

```bash
my-application$ sam build
```

The AWS SAM CLI installs dependencies that are defined in `package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
my-application$ sam local invoke helloFromLambdaFunction --no-event
```



## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, the AWS SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs that are generated by your Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

**NOTE:** This command works for all Lambda functions, not just the ones you deploy using AWS SAM.

```bash
JobApplications$ sam logs -n JobApplicationsFunction --stack-name job-applications --tail
```

**NOTE:** This uses the logical name of the function within the stack. This is the correct name to use when searching logs inside an AWS Lambda function within a CloudFormation stack, even if the deployed function name varies due to CloudFormation's unique resource name generation.

You can find more information and examples about filtering Lambda function logs in the [AWS SAM CLI documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `__tests__` folder in this project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
my-application$ npm install
my-application$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name JobApplications
```
