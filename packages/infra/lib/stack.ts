import { CorsHttpMethod, HttpApi } from "@aws-cdk/aws-apigatewayv2"
import { IVpc, Vpc } from "@aws-cdk/aws-ec2"
import { Tracing } from "@aws-cdk/aws-lambda"
import { App, Duration, Stack, StackProps as CdkStackProps } from "@aws-cdk/core"
import { FunctionOptions, ResourceGeneratorConstruct, ResourceGeneratorProps } from "@jetkit/cdk"
import { stackResources } from "template-api"
import { appName } from "template-common"
import { Database } from "./database"

// default Lambda settings
const functionOptions: FunctionOptions = {
  tracing: Tracing.ACTIVE, // x-ray
  bundling: {
    minify: true,
    sourceMap: true,
    externalModules: ["pg", "pg-native", "aws-sdk"],
  },
  timeout: Duration.seconds(5),
  memorySize: 256,
}

interface StackProps extends CdkStackProps {
  isProduction: boolean
}

export class InfraStack extends Stack {
  constructor(scope: App, id: string, { isProduction }: StackProps) {
    super(scope, id)

    // API
    const httpApi = new HttpApi(this, `Api${appName}`, {
      corsPreflight: {
        allowHeaders: ["Authorization"],
        allowMethods: [CorsHttpMethod.ANY],
        allowOrigins: ["*"],
        maxAge: Duration.days(10),
      },
    })

    // VPC
    const vpc = new Vpc(this, appName, { natGateways: 0 })

    const jetkitProps: ResourceGeneratorProps = {
      resources: stackResources,
      httpApi,
      functionOptions,
    }

    // uncomment to get a postgres database
    // new Database(this, "DB", { isProduction, vpc: vpc as IVpc, jetkitProps })

    // JetKit
    new ResourceGeneratorConstruct(this, "Gen", jetkitProps)
  }
}
