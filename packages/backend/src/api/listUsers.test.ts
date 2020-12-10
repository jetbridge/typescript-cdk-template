import { getConnection, createConnection } from "typeorm";
import { Connection } from "typeorm";
import { User } from "jkv2-core";
import { SnakeNamingStrategy } from "typeorm-naming-strategies/snake-naming.strategy"

let connection: Connection

const ALL_ENTITIES = [User]

beforeAll(async () => {
    connection = await createConnection({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: `walrus_test_${process.env.JEST_WORKER_ID}`,
        logging: false,
        entities: ALL_ENTITIES,
        namingStrategy: new SnakeNamingStrategy(),
    });
});

afterAll(async () => {
    connection.close();
});


beforeEach(async () => {
    const queryRunner = getConnection().createQueryRunner();

    await queryRunner.query(`
      DO
      $func$
      BEGIN
        EXECUTE (
          SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' CASCADE'
            FROM pg_class
            WHERE relkind = 'r'
            AND relnamespace = 'public'::regnamespace
        );
      END
      $func$;
    `);
    await queryRunner.release();
});


describe('UserRepository', () => {
    it('should create user', async () => {
        const repository = connection.getRepository(User)
        repository.create({ name: "Dmytro", email: "dmytro@jetbridge.com" })

        expect(await repository.count()).toEqual(1);
    });

    it('should delete user', async () => {
        const repository = connection.getRepository(User)
        const userId = await repository.create({ name: "Dmytro", email: "dmytro@jetbridge.com" });
        await repository.delete(userId);

        expect(await repository.count()).toEqual(0);
    });
});