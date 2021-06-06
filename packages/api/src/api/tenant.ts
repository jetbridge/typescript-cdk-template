import { HttpMethod } from "@aws-cdk/aws-apigatewayv2"
import { badRequest } from "@jdpnielsen/http-error"
import { ApiView, ApiViewBase, apiViewHandler, Duration, RequestHandler } from "@jetkit/cdk"
import { db, Tenant } from "template-repo"

@ApiView({
  path: "/tenant",
  methods: [HttpMethod.GET],
  grantDatabaseAccess: true,
})
export class TenantApi extends ApiViewBase {
  override get: RequestHandler = async () => {
    // get first tenant
    const tenants = await (await db.getConnection()).manager.find(Tenant)
    return JSON.stringify({
      tenants,
    })
  }
}
export const handler = apiViewHandler(__filename, TenantApi)
