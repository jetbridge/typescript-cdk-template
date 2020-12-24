import { db } from "../.."
import { User, PaginatedResponse } from "jkv2-core"
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { getPaginationData, getPagesData } from "../../util/pagination"


export async function listUsers(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2<PaginatedResponse<User>>> {
  /**
   * Get a paginated list of users
   */
  const pagesData = getPagesData(event.queryStringParameters)

  const conn = await db.getConnection()
  const users = await conn.getRepository(User).createQueryBuilder("user").getMany()

  const totalCount = await conn.getRepository(User).createQueryBuilder("user").getCount()

  return {
    items: users,
    paginationData: getPaginationData(totalCount, pagesData),
  }
}
