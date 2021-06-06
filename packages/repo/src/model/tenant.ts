import { BaseModel } from "@jetkit/cdk"
import { Column, Entity, OneToMany } from "typeorm"
import { Vacancy } from "./vacancy"

/**
 * Represents a client.
 */
@Entity()
export class Tenant extends BaseModel {
  @Column({ nullable: true })
  name: string

  @OneToMany(() => Vacancy, (vacancy) => vacancy.tenant)
  // @JoinTable({ name: "game_genre" })
  vacancies: Vacancy[]
}
