import { PrismaClient } from "@prisma/client"
import { tenantFactory } from "../src/factory/tenant"

const prisma = new PrismaClient()

export async function main() {
  // create tenants
  await prisma.tenant.createMany({ data: [...Array(5)].map(() => tenantFactory.build()) })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
