import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { Request } from "express";
import { CreateServiceDTO, UpdateServiceDTO } from "./service.dto";
import { Service } from "./service.entities";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guards";

@Controller('service')
export class ServiceController {
    constructor(private readonly serviceService : ServiceService){
    
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getIndex(@Req() request : Request) : Promise<Service[]> {
        return this.serviceService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':serviceID')
    getCatById(@Param('serviceID') id : number) : Promise<Service> {
        return this.serviceService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    postCreate(@Body() createServiceDTO : CreateServiceDTO) : Promise<Service> {
        return this.serviceService.create(createServiceDTO)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateLaundryById(@Param('serviceID')id : number,@Body() updateServiceDTO : UpdateServiceDTO): Promise<Service> {
        return this.serviceService.update(updateServiceDTO)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':serviceID')
    deleteCatById(@Param('serviceID') id : number) : string {
        this.serviceService.DeleteQueryBuilder(id);
        return "OK"
    }
}