import { Prisma } from "@prisma/client"
import faker from "faker/locale/en_US"
import { Factory } from "fishery"
import { v4 } from "uuid"

export const tenantFactory = Factory.define<Prisma.TenantCreateInput>(() => ({
  id: v4(),
  name: faker.company.companyName() + " " + faker.company.companySuffix(),
}))
