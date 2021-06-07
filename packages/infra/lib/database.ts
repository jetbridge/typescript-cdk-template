import { SubnetType } from "@aws-cdk/aws-ec2"
import { AuroraCapacityUnit } from "@aws-cdk/aws-rds"
import { ParameterGroup } from "@aws-cdk/aws-rds"
import { Construct, Duration, RemovalPolicy } from "@aws-cdk/core"
import { ResourceGeneratorProps, SlsPgDb, SlsPgDbProps } from "@jetkit/cdk"
import { appName } from "template-common"

// https://github.com/jetbridge/lambda-layer-typeorm-pg
const TYPEORM_PG_LAYER_ARN = "arn:aws:lambda:us-east-1:898466741470:layer:TypeORMPgLayerBD740AF5:9"

export interface DatabaseProps extends SlsPgDbProps {
  isProduction: boolean
  jetkitProps: Partial<ResourceGeneratorProps>
}

export class Database extends SlsPgDb {
  constructor(scope: Construct, id: string, { isProduction, jetkitProps, ...props }: DatabaseProps) {
    super(scope, id, {
      ...props,
      vpcSubnets: {
        subnetType: SubnetType.ISOLATED,
      },
      clusterIdentifier: appName,
      defaultDatabaseName: appName,
      parameterGroup: ParameterGroup.fromParameterGroupName(scope, "ParameterGroup", "default.aurora-postgresql10"),
      removalPolicy: isProduction ? RemovalPolicy.RETAIN : RemovalPolicy.DESTROY,
      scaling: {
        minCapacity: AuroraCapacityUnit.ACU_2,

        // set to higher number to pay more money if there is heavy load
        maxCapacity: AuroraCapacityUnit.ACU_4,

        // go to sleep to save money?
        autoPause: isProduction ? Duration.hours(24) : Duration.hours(8),
      },
    })
    jetkitProps.databaseCluster = this
    this.addLayers(jetkitProps)
  }

  /**
   * Adds a layer to all functions containing typeorm, pg, and typeorm-aurora-data-api-driver
   */
  private addLayers(jetkitProps: Partial<ResourceGeneratorProps>) {
    // vivify func bundling options
    jetkitProps.functionOptions ||= {}
    jetkitProps.functionOptions.layerArns ||= []
    // @ts-expect-error override read-only
    jetkitProps.functionOptions.bundling ||= {}
    // @ts-expect-error override read-only
    jetkitProps.functionOptions.bundling.externalModules ||= []

    // add typeorm layer to functionOptions
    jetkitProps.functionOptions.layerArns.push(TYPEORM_PG_LAYER_ARN)
    jetkitProps.functionOptions.bundling.externalModules.push(
      // from layer
      "typeorm",
      "pg",
      "typeorm-aurora-data-api-driver",

      // from lambda env
      "aws-sdk"
    )
  }
}
