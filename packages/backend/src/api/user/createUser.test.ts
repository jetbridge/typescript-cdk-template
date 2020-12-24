import { db } from '../..';
import { Connection } from 'typeorm';
import { User, PaginatedResponse } from 'jkv2-core';
import { listUsers } from './listUsers';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { createUser } from './createUser';


let conn: Connection





beforeEach(async () => {
    conn = await db.getConnection() as unknown as Connection
});

afterEach(async () => {
    await conn.close()
})


describe('Test creating a user', () => {
    it(
        "Create a user. Then check that there's  only 1 in the database and it gets reset with every test.",
        async () => {
            const user: User = await createUser({ body: "{\"email\":\"dmytro@jetbridge.com\"}" } as unknown as APIGatewayProxyEventV2) as User

            expect(user.email).toEqual('dmytro@jetbridge.com')

            const users = (await listUsers({} as APIGatewayProxyEventV2) as PaginatedResponse<User>).items

            expect(users.length).toEqual(1)

        }
    )

});