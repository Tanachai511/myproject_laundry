import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";

export class CreateServiceDTO {
    @IsNotEmpty()
    serviceName : string;

    @IsNotEmpty()
    servicePrice : number;

}

export class UpdateServiceDTO {
    @IsNotEmpty()
    serviceID : number;

    @IsNotEmpty()
    serviceName : string;

    @IsNotEmpty()
    servicePrice : number;
}