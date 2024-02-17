import { Role } from "src/auth/role.enum";
import { Cart } from "src/cart/cart.entities";
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, OneToMany } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column({ unique : true})
    username : string

    @Column()
    password : string

    @Column({ default: Role.User }) 
    role: Role;

    @CreateDateColumn()
    createdate : Date

    @OneToMany(type => Cart, cart => cart.user)
    cart: Cart[]
}