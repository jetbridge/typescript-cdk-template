import { db } from "../.."
import { User, PaginatedResponse } from "jkv2-core"
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda"
import { getPaginationData, getPagesData } from "../../util/pagination"


interface ICreateUserRequest {
    email: string
}


export async function createUser(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2<User>> {
    /**
     * Create a user
     */

    if (!event.body) {
        console.warn("No request body provided")
        return {
            statusCode: 400,
        }
    }
    const body: ICreateUserRequest = JSON.parse(event.body)

    console.log(body)

    const email = body.email

    console.log(email)
    const conn = await db.getConnection()

    const repo = conn.getRepository(User)

    const user = repo.create({
        email: email,
    })

    await repo.save(user)


    return user
}
