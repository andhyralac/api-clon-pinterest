import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entities/post.entity";
import { BaseEntity } from "../../config/base.entity";


@Entity()
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 225 })
    description: string;

    @OneToMany(() => Post, (post) => post.category)
    posts: Post[];

}