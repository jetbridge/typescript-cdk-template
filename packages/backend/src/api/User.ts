import { db } from ".."
import { User } from "jkv2-core"
import { APIGatewayProxyEvent } from "aws-lambda"
import { classValidator } from "@lambda-middleware/class-validator"
import { compose } from "@lambda-middleware/compose"
// import { errorHandler } from "@lambda-middleware/http-error-handler"

/**
 * List users
 */
export async function list(event: APIGatewayProxyEvent): Promise<User[]> {
  const conn = await db.getConnection()
  return conn.getRepository(User).find()
}

/**
 * Add a user
 */
export async function createInner(event: { body: User }) {
  const conn = await db.getConnection()
  const newUser = conn.getRepository(User).save({ ...event.body, password_encrypted: "foo" })
  return newUser
}
export const create = compose(classValidator({ bodyType: User }))(createInner)
