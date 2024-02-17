import { Cart } from 'src/cart/cart.entities';
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, OneToMany} from 'typeorm'

@Entity()
export class Service extends BaseEntity {
    @PrimaryGeneratedColumn()
    serviceID : number;

    @Column()
    serviceName : string;

    @Column()
    servicePrice : number;
    
    @OneToMany(() => Cart, (cart: Cart) => cart.service, {
        eager: false,
      })
      cart: Cart[];

}