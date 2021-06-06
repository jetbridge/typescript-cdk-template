import faker from "faker/locale/en_US"
import { Factory } from "fishery"
import { Tenant } from "../model/tenant"

export const tenantFactory: Factory<Tenant> = Factory.define<any>(() => ({
  name: faker.company.companyName(),
}))
