import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "../../config/base.entity";


@Entity()
export class Profile extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 225, unique: true })
    name: string;

    @Column({ type: "varchar", length: 255 })
    lastname: string;

    @Column({ type: "varchar", length: 255 })
    nickname: string;

    @Column({ type: "varchar", length: 255 })
    img: string;

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}