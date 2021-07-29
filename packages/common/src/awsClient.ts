/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
import AWS from "aws-sdk"

// import AWSXRay from "aws-xray-sdk"
// AWSXRay.setContextMissingStrategy(() => {})

// // capture HTTP requests
// AWSXRay.captureHTTPsGlobal(require("http"))
// AWSXRay.captureHTTPsGlobal(require("https"))
// AWSXRay.capturePromise()

// clients
const isTest = process.env.JEST_WORKER_ID
const config: AWS.DynamoDB.ClientConfiguration = {
  ...(isTest && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local-env",
  }),
}

export const dynamoClient = new AWS.DynamoDB(config)
export const documentClient = new AWS.DynamoDB.DocumentClient({
  ...config,
  service: dynamoClient,
})
