import { Factory } from "fishery"
import { Vacancy } from "../model/vacancy"
import { tenantFactory } from "./tenant"
import { v4 as uuidV4 } from "uuid"
import faker from "faker/locale/en_US"

export const vacancyFactory = Factory.define<Vacancy>(() => ({
  id: uuidV4(),
  name: faker.random.words(),
  tenant: tenantFactory.build(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
}))
