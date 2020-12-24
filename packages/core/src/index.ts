require("dotenv-flow").config()
import { Database } from "./db/Connection"
export { createDatabasesForJestWorkers } from "./test/createDatabasesForJestWorkers"
export { User } from "./model/User"
export { BaseModel } from "./model/BaseModel"
export * from './util/pagination'

export { Database } from "./db/Connection"

// this might be wrong
export const db = new Database()
