import { CorsHttpMethod, HttpApi } from "@aws-cdk/aws-apigatewayv2"
import { NodejsFunctionProps } from "@aws-cdk/aws-lambda-nodejs"
import { App, Duration, Stack, StackProps } from "@aws-cdk/core"
import { ResourceGeneratorConstruct } from "@jetkit/cdk"
import { appName, stackResources } from "demo-backend"

// default Lambda settings
const functionOptions: NodejsFunctionProps = {
  bundling: {
    minify: true,
    sourceMap: true,
  },
}

export class InfraStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const httpApi = new HttpApi(this, `Api${appName}`, {
      corsPreflight: {
        allowHeaders: ["Authorization"],
        allowMethods: [CorsHttpMethod.ANY],
        allowOrigins: ["*"],
        maxAge: Duration.days(10),
      },
    })

    new ResourceGeneratorConstruct(this, appName, {
      resources: stackResources,
      httpApi,
      functionOptions,
    })
  }
}
