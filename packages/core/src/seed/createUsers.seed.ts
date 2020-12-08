/* eslint-disable no-unused-vars */
import { Seeder, Factory } from "typeorm-seeding"
import { Connection } from "typeorm"
import { User } from "../model/User"

export default class CreateUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(User)().createMany(10)
    }
}
