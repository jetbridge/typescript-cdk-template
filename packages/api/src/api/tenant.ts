import { HttpMethod } from "@aws-cdk/aws-apigatewayv2"
import { ApiView, ApiViewBase, apiViewHandler, ApiHandler, Duration } from "@jetkit/cdk"
import { TenantRepository } from "template-repo"

@ApiView({
  path: "/tenant",
  methods: [HttpMethod.GET],
  grantDatabaseAccess: true,
  memorySize: 1024,
  timeout: Duration.seconds(10),
})
export class TenantApi extends ApiViewBase {
  override get: ApiHandler = async () => {
    const repo = new TenantRepository()
    const tenants = await repo.list()
    return JSON.stringify(tenants)
  }
}
export const handler = apiViewHandler(__filename, TenantApi)
