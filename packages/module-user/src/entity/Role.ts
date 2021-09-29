import { Entity, PrimaryGeneratedColumn, Column , ManyToOne} from "typeorm";
import User from './User';
@Entity()
export default class Role {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    slug: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToOne(() => User, user => user.roles)
    user: User;
}