import { Cart } from 'src/cart/cart.entities';
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany} from 'typeorm'

@Entity()
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    paymentID : number;

    @Column()
    paymentType : string;

    @OneToMany(() => Cart, (cart: Cart) => cart.payment, {
      })
    cart: Cart[];
}