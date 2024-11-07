import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";
import { User } from "../../user/entities/user.entity";


@Entity()
export class Like {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Post, (post) => post.likes)
    post: Post;

    @ManyToOne(() => User, (user) => user.likes)
    user: User;
}