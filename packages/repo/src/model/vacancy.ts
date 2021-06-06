import { BaseModel } from "@jetkit/cdk"
import { Column, Entity, ManyToOne } from "typeorm"
import { Tenant } from "./tenant"

@Entity()
export class Vacancy extends BaseModel {
  @Column({ nullable: false })
  name: string

  @ManyToOne(() => Tenant, (tenant) => tenant.vacancies)
  // @JoinTable({ name: "game_genre" })
  tenant: Tenant
}
