import { DatabaseManager } from "@jetkit/cdk"
import { Tenant } from "./model/tenant"
import { Vacancy } from "./model/vacancy"

// DB models
export { Tenant } from "./model/tenant"
export { Vacancy } from "./model/vacancy"

// Factories

// Utilities
export * from "./util/pagination"

export { DatabaseManager }

const db = new DatabaseManager({
  entities: [Tenant, Vacancy],
  printQueries: true,
})
export { db }
