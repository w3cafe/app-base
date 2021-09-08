import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: number;

    @Column()
    contactNo: number;

    @Column()
    password: number;
}