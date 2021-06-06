import { BaseModel } from "@jetkit/cdk"
import { Column, Entity } from "typeorm"

/**
 * Represents a client.
 */
@Entity()
export class Tenant extends BaseModel {
  @Column({ nullable: true })
  name: string
}
