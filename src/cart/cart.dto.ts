import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreatePaymentDTO } from "src/payment/payment.dto";
import { CreateServiceDTO } from "src/service/service.dto";

export class CreateCartDTO {
    @IsNotEmpty()
    cartPrice : number;

    @IsNotEmpty()
    FandLname : string

    @IsNotEmpty()
    addr : string

    @IsNotEmpty()
    phone : number

    @IsNotEmpty()
    status : string
    
    @IsNotEmpty()
    deliveryDate : string;

    @ValidateNested({ each: true})
    @Type(() => CreatePaymentDTO)
    payment: CreatePaymentDTO

    @ValidateNested({ each: true})
    @Type(() => CreateServiceDTO)
    service: CreateServiceDTO
}

export class UpdateCartDTO {
    @IsNotEmpty()
    cartID : number;

    @IsNotEmpty()
    paymentStatus : string;
}