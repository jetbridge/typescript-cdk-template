import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from "typeorm"
import { inspect } from "util"
import { User } from "jkv2-core"

// instrument queries with xray
const AWSXRay = require("aws-xray-sdk")
AWSXRay.capturePostgres(require("pg"))

// list of entities from core go here
const ALL_ENTITIES = [User]

/**
 * Database manager class
 * Taken from https://medium.com/safara-engineering/wiring-up-typeorm-with-serverless-5cc29a18824f
 * This MAY NOT BE THE BEST WAY TO GET/CACHE DB CONNECTIONS!
 */
export class Database {
  private connectionManager: ConnectionManager

  constructor() {
    this.connectionManager = getConnectionManager()
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = "lemmy-aurora-data-api"

    let connection: Connection

    if (this.connectionManager.has(CONNECTION_NAME)) {
      connection = await this.connectionManager.get(CONNECTION_NAME)

      if (!connection.isConnected) {
        connection = await connection.connect()
      }
    } else {
      const connectionOptions: ConnectionOptions = {
        entities: ALL_ENTITIES,
        type: "aurora-data-api-pg",
        // type: `postgres`,
        database: "lemmy",
        secretArn:
          "arn:aws:secretsmanager:eu-west-1:736338821564:secret:rds-db-credentials/cluster-7556WO6SLQ3MHNOKFVGYVYKJOQ/postgres-TL9sG8",
        resourceArn: "arn:aws:rds:eu-west-1:736338821564:cluster:lemmy-prod",
        region: "eu-west-1",
        logging: ["query", "error"], // log queries
        name: CONNECTION_NAME,
        // port: 5432,
        // synchronize: true,
        // host: process.env.DB_HOST,
        // username: process.env.DB_USERNAME,
        // database: process.env.DB_NAME,
        // password: process.env.DB_PASSWORD,
        // namingStrategy: new SnakeNamingStrategy(),
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
