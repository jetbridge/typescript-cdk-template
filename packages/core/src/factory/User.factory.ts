import { define } from "typeorm-seeding"
import Faker from "faker"
import { User } from "../model/User"

define(User, (faker: typeof Faker) => {
    const user = new User()
    user.name = faker.lorem.word()
    user.email = faker.internet.email()
    return user
})
