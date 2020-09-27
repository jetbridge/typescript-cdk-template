import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { IsEmail, IsNotEmpty } from "class-validator"

@Entity("user_")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  name: string

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Column()
  password_encrypted: string
}
