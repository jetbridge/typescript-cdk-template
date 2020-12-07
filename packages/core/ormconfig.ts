import { SnakeNamingStrategy } from "typeorm-naming-strategies/snake-naming.strategy"
import { getConnectionOptions } from "./src/db/Connection"

const connectionOptions = getConnectionOptions()

module.exports = {
    // type: "postgres",
    // host: "localhost",
    // port: 5432,

    // database: "mercury",

    ...connectionOptions,

    entities: ["src/model/*.ts"],
    migrations: ["src/migrations/*.ts"],
    cli: {
        migrationsDir: "src/migrations",
    },
    seeds: ["src/seed/*.ts"],
    factories: ["src/factory/*.ts"],
    namingStrategy: new SnakeNamingStrategy(),
}
