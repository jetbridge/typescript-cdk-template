import dotenv from "dotenv"
import path from "path"
import { Database } from "./db/Connection"
const dotenvPath = path.join(__dirname, "../", `config/.env.${process.env.NODE_ENV}`)
dotenv.config({
  path: dotenvPath,
})

// THIS IS WRONG
export const db = new Database()
