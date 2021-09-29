import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Role from './Role';
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

    @Column('longtext')
    extraFields: string;

    @Column('longtext')
    authProviderData: string;


    @OneToMany(() => Role, role => role.user)
    roles: Role[];
}