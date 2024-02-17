import { Payment } from 'src/payment/payment.entities';
import { Service } from 'src/service/service.entities';
import { User } from 'src/user/user.entities';
import {Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne} from 'typeorm'

@Entity()
export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    cartID : number;

    @Column()
    FandLname : string

    @Column()
    addr : string

    @Column()
    phone : number

    @Column()
    deliveryDate : Date;

    @Column()
    cartPrice : number; 
    
    @Column()
    status : string

    @ManyToOne(type => Payment, payment => payment.cart, {
        eager: true,
    })
    payment: Payment

    @ManyToOne(type => Service, service => service.cart, {
        eager: true,
    })
    service: Service

    @ManyToOne(type => User, user => user.cart, {
        eager: true, 
    })
    user: User

}