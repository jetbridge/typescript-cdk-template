import { SnakeNamingStrategy } from "typeorm-naming-strategies/snake-naming.strategy"
import { getConnectionOptions } from "./src/db/Connection"

const connectionOptions = getConnectionOptions()

module.exports = {
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
