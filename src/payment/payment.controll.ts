import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { PaymentService } from "./Payment.service";
import { Request } from "express";
import { CreatePaymentDTO, UpdatePaymentDTO } from "./Payment.dto";
import { Payment } from "./Payment.entities";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guards";

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService : PaymentService){
    }
    
    @UseGuards(JwtAuthGuard)
    @Get()
    getIndex(@Req() request : Request) : Promise<Payment[]> {
        return this.paymentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':paymentID')
    getCatById(@Param('paymentID') id : number) : Promise<Payment> {
        return this.paymentService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    postCreate(@Body() createPaymentDTO : CreatePaymentDTO) : Promise<Payment> {
        return this.paymentService.create(createPaymentDTO)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':paymentID')
    updatePaymentById(@Param('paymentID')id : number,@Body() updatePaymentDTO : UpdatePaymentDTO): Promise<Payment> {
        return this.paymentService.update(updatePaymentDTO)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':paymentID')
    deletePaymentById(@Param('paymentID') id : number) : string {
        this.paymentService.DeleteQueryBuilder(id);
        return "OK"
    }
}