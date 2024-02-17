import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { PaymentService } from "./Payment.service";
import { Request } from "express";
import { CreatePaymentDTO, UpdatePaymentDTO } from "./Payment.dto";
import { Payment } from "./Payment.entities";

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService : PaymentService){
    
    }

    @Get()
    getIndex(@Req() request : Request) : Promise<Payment[]> {
        return this.paymentService.findAll();
    }

    @Get(':paymentID')
    getCatById(@Param('paymentID') id : number) : Promise<Payment> {
        return this.paymentService.findOne(id)
    }

    @Post()
    postCreate(@Body() createPaymentDTO : CreatePaymentDTO) : Promise<Payment> {
        return this.paymentService.create(createPaymentDTO)
    }

    @Put(':paymentID')
    updatePaymentById(@Param('paymentID')id : number,@Body() updatePaymentDTO : UpdatePaymentDTO): Promise<Payment> {
        return this.paymentService.update(updatePaymentDTO)
    }

    @Delete(':paymentID')
    deletePaymentById(@Param('paymentID') id : number) : string {
        this.paymentService.DeleteQueryBuilder(id);
        return "OK"
    }
}