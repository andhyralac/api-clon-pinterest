import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";
import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../config/base.entity";


@Entity()
export class Like extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Post, (post) => post.likes)
    post: Post;

    @ManyToOne(() => User, (user) => user.likes)
    user: User;
}