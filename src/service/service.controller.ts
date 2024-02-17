import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { Request } from "express";
import { CreateServiceDTO, UpdateServiceDTO } from "./service.dto";
import { Service } from "./service.entities";

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService : ServiceService){
    
    }

    @Get()
    getIndex(@Req() request : Request) : Promise<Service[]> {
        return this.serviceService.findAll();
    }

    @Get(':serviceID')
    getCatById(@Param('serviceID') id : number) : Promise<Service> {
        return this.serviceService.findOne(id)
    }

    @Post()
    postCreate(@Body() createServiceDTO : CreateServiceDTO) : Promise<Service> {
        return this.serviceService.create(createServiceDTO)
    }

    @Put(':id')
    updateLaundryById(@Param('serviceID')id : number,@Body() updateServiceDTO : UpdateServiceDTO): Promise<Service> {
        return this.serviceService.update(updateServiceDTO)
    }

    @Delete(':serviceID')
    deleteCatById(@Param('serviceID') id : number) : string {
        this.serviceService.DeleteQueryBuilder(id);
        return "OK"
    }
}