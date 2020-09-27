import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from "typeorm"
import { inspect } from "util"
// import { SnakeNamingStrategy } from './SnakeNamingStrategy'
import { User } from "jkv2-core"

/**
 * Database manager class
 */
export class Database {
  private connectionManager: ConnectionManager

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = `default`

    let connection: Connection

    if (this.connectionManager.has(CONNECTION_NAME)) {
      connection = await this.connectionManager.get(CONNECTION_NAME)

      if (!connection.isConnected) {
        connection = await connection.connect()
      }
    } else {
      const connectionOptions: ConnectionOptions = {
        type: "aurora-data-api-pg",
        database: "lemmy",
        secretArn:
          "arn:aws:secretsmanager:eu-west-1:736338821564:secret:rds-db-credentials/cluster-7556WO6SLQ3MHNOKFVGYVYKJOQ/postgres-TL9sG8",
        resourceArn: "arn:aws:rds:eu-west-1:736338821564:cluster:lemmy-prod",
        region: "eu-west-1",
        logging: ["query", "error"], // log queries
        name: `lemmy-aurora-data-api`,
        // type: `postgres`,
        // port: 5432,
        // synchronize: true,
        // logging: true,
        // host: process.env.DB_HOST,
        // username: process.env.DB_USERNAME,
        // database: process.env.DB_NAME,
        // password: process.env.DB_PASSWORD,
        // namingStrategy: new SnakeNamingStrategy(),
        entities: [__dirname + "/../entity/*.*", User],
      }

      // Don't need a pwd locally
      if (process.env.DB_PASSWORD) {
        Object.assign(connectionOptions, {
          password: process.env.DB_PASSWORD,
        })
      }

      connection = await createConnection(connectionOptions)
    }

    return connection
  }
}
