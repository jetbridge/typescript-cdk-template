import { db } from ".."
import { User, PaginatedResponse } from "jkv2-core"
import { APIGatewayProxyEvent, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { getPaginationData, getPagesData } from "../util/pagination"

/**
 * List users
 */
export async function listUsers(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2<PaginatedResponse<User>>> {
  console.log(`LOCAL_DB: ${process.env.USE_LOCAL_DB}`)
  const pagesData = getPagesData(event.queryStringParameters)

  const conn = await db.getConnection()
  const users = await conn.getRepository(User).createQueryBuilder("user").getMany()

  const totalCount = await conn.getRepository(User).createQueryBuilder("user").getCount()

  return {
    items: users,
    paginationData: getPaginationData(totalCount, pagesData),
  }
}
