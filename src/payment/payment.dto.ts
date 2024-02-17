import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { CreateCartDTO } from "src/cart/cart.dto";

export class CreatePaymentDTO {
    @IsNotEmpty()
    paymentType : string;
}

export class UpdatePaymentDTO {
    @IsNotEmpty()
    paymentID : number;

    @IsNotEmpty()
    paymentType : string;
}