import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./payment.entities";
import { CreatePaymentDTO, UpdatePaymentDTO } from "./payment.dto";


@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment)
        private paymentRepository : Repository<Payment>
    ) {

    }

    findAll() : Promise<Payment[]>{
        return this.paymentRepository.find();
    }

    findOne(id:number): Promise<Payment|null>{
        return this.paymentRepository.findOneBy({paymentID:id});
    }

    async create(payment : CreatePaymentDTO) : Promise<any> {
        return this.paymentRepository.save(payment)
    }

    update(updatePaymentDTO : UpdatePaymentDTO) : Promise<Payment|null>{
        return this.paymentRepository.save(updatePaymentDTO);
    }

    async DeleteQueryBuilder(id:number) : Promise<void> {
        await this.paymentRepository.delete({paymentID:id})
    }
}