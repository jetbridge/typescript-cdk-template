import { DatabaseManager } from "@jetkit/cdk"
import { Tenant } from "./model/tenant"

// DB models
export { Tenant } from "./model/tenant"

export { DatabaseManager }

const db = new DatabaseManager({
  entities: [Tenant],
  printQueries: true,
})
export { db }
