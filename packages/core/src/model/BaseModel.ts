import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

export class BaseModel {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
