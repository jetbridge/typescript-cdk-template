import { CorsHttpMethod, HttpApi } from "@aws-cdk/aws-apigatewayv2"
import { App, Duration, Stack, StackProps } from "@aws-cdk/core"
import { ResourceGeneratorConstruct } from "@jetkit/cdk"
import { stackResources } from "../../backend/src/app"

export class InfraStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const httpApi = new HttpApi(this, "Api", {
      corsPreflight: {
        allowHeaders: ["Authorization"],
        allowMethods: [CorsHttpMethod.ANY],
        allowOrigins: ["*"],
        maxAge: Duration.days(10),
      },
    })

    new ResourceGeneratorConstruct(this, "Generator", {
      resources: stackResources,
      httpApi,
    })
  }
}
