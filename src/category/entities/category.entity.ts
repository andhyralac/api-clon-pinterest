import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";


@Entity()
export class Category {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 225 })
    description: string;

    @OneToMany(() => Post, (post) => post.category)
    posts: Post[];

}