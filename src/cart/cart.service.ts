import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./cart.entities";
import { CreateCartDTO, UpdateCartDTO } from "./cart.dto";
import { Payment } from "src/payment/payment.entities";
import { Service } from "src/service/service.entities";
import { User } from "src/user/user.entities";


@Injectable()
export class CartService {

    constructor(
        @InjectRepository(Cart)
        private cartRepository : Repository<Cart>,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {

    }

    findAll(user: User) : Promise<Cart[]>{
        return this.cartRepository.find({where: {user}});
    }

    async findOne(id: number, user: User): Promise<Cart> {
        const cart = await this.cartRepository.findOne({ where: { cartID:id, user } });
        return cart
      }

    async create(cartDTO : CreateCartDTO, user: User) : Promise<Cart|null> {
        
        let payment = new Payment()
        payment.paymentType = cartDTO.payment.paymentType
        await payment.save()
        Logger.log(JSON.stringify(payment))  

        let service = new Service()
        service.serviceName = cartDTO.service.serviceName
        service.servicePrice = cartDTO.service.servicePrice
        
        await service.save()
        Logger.log(JSON.stringify(service))

        let cartEntity = new Cart()
        cartEntity.FandLname = cartDTO.FandLname
        cartEntity.addr = cartDTO.addr
        cartEntity.phone = cartDTO.phone
        cartEntity.deliveryDate = cartDTO.deliveryDate
        cartEntity.status = cartDTO.status
        cartEntity.cartPrice = cartDTO.cartPrice
        cartEntity.payment = payment
        cartEntity.service = service    
        cartEntity.user = user;
        Logger.log(JSON.stringify(cartEntity))

        
        let result = await cartEntity.save()
    
        return result
        
    }

    update(updateCartDTO : UpdateCartDTO, user: User) : Promise<Cart|null>{
        return this.cartRepository.save(updateCartDTO);
    }

    async DeleteQueryBuilder(id:number, user: User) : Promise<void> {
        await this.cartRepository.delete({cartID:id})
    }
}