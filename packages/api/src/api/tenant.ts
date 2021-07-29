import { HttpMethod } from "@aws-cdk/aws-apigatewayv2"
import { ApiView, ApiViewBase, apiViewHandler, ApiHandler } from "@jetkit/cdk"
import { TenantRepository } from "template-repo"

@ApiView({
  path: "/tenant",
  methods: [HttpMethod.GET],
  grantDatabaseAccess: true,
})
export class TenantApi extends ApiViewBase {
  override get: ApiHandler = async () => {
    const repo = new TenantRepository()
    const tenants = await repo.list()
    return JSON.stringify(tenants)
  }
}
export const handler = apiViewHandler(__filename, TenantApi)
