import { Table } from "dynamodb-toolbox"
import { TableConstructor } from "dynamodb-toolbox/dist/classes/Table"
import { documentClient as DocumentClient, EnvVars } from "template-common"

/**
 * Single DynamoDB table to hold our entire application.
 * https://github.com/jeremydaly/dynamodb-toolbox#conventions-motivations-and-migrations-from-v01
 * Good explanation: https://www.youtube.com/watch?v=BnDKD_Zv0og
 */
export const devBaseTableOptions: TableConstructor = {
  // Specify table name (used by DynamoDB)
  name: process.env[EnvVars.appTable] || "App",

  partitionKey: "pk",
  sortKey: "sk",

  attributes: {
    GSI1pk: "string",
    GSI1sk: "string",
    GSI2pk: "string",
    GSI2sk: "string",
  },

  indexes: {
    GSI1: { partitionKey: "GSI1pk", sortKey: "GSI1sk" },
    // GSI2: { partitionKey: "test" },
    // LSI1: { partitionKey: 'pk', sortKey: 'other_sk' },
    // LSI2: { sortKey: 'data' }
  },

  DocumentClient,
}

export const DevBaseTable = new Table(devBaseTableOptions)
