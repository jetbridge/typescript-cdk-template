import { HttpMethod } from "@aws-cdk/aws-apigatewayv2"
import { ApiView, ApiViewBase, apiViewHandler, RequestHandler } from "@jetkit/cdk"
import { db, Tenant } from "template-repo"

@ApiView({
  path: "/tenant",
  methods: [HttpMethod.GET],
  grantDatabaseAccess: true,
})
export class TenantApi extends ApiViewBase {
  override get: RequestHandler = async () => {
    // list tenants
    const tenants = await (await db.getConnection()).manager.find(Tenant)
    return JSON.stringify({
      tenants,
    })
  }
}
export const handler = apiViewHandler(__filename, TenantApi)
