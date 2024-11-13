import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Like } from "../../like/entities/like.entity";
import { Category } from "../../category/entities/category.entity";
import { User } from "../../user/entities/user.entity";
import { BaseEntity } from "../../config/base.entity";


@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "varchar" })
    img: string;

    @ManyToOne(() => Category, (category) => category.posts)
    category: Category;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @OneToMany(() => Like, (like) => like.post)
    likes: Like[];

}