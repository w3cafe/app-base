import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    fullName: string

    @Column()
    email: number;

    @Column()
    contactNo: number;

    @Column()
    password: number;
}