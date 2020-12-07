import { Entity, Column } from "typeorm"
import { IsEmail } from "class-validator"
import { BaseModel } from "./BaseModel"

@Entity("user_")
export class User extends BaseModel {
  @Column({ nullable: true })
  name: string

  @Column({ nullable: false })
  @IsEmail()
  email: string
}
