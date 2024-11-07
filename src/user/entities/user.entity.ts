import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";
import { Like } from "../../like/entities/like.entity";
import { Post } from "../../post/entities/post.entity";


@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 225, unique: true })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @OneToOne(() => Profile, (profile) => profile.user)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
}