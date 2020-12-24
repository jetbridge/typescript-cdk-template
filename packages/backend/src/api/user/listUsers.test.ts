import { db } from '../..';
import { Connection } from 'typeorm';
import { User, PaginatedResponse } from 'jkv2-core';
import { listUsers } from './listUsers';
import { APIGatewayProxyEventV2 } from 'aws-lambda';


let conn: Connection




beforeEach(async () => {
    conn = await db.getConnection() as unknown as Connection
});

afterEach(async () => {
    await conn.close()
})



describe('Test getting a list of users', () => {
    it(
        'Get a paginated list of users',
        async () => {
            const repo = conn.getRepository(User)

            const user = repo.create({
                name: "TestUser",
                email: "testemail@test.com"
            })

            await repo.save(user)

            const users = (await listUsers({} as APIGatewayProxyEventV2) as PaginatedResponse<User>).items

            const userIds = users.map(user => user.id)
            expect(userIds).toContain(user.id)

        }
    )

});