import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Service } from "./service.entities";
import { CreateServiceDTO, UpdateServiceDTO } from "./service.dto";

@Injectable()
export class ServiceService {

    constructor(
        @InjectRepository(Service)
        private serviceRepository : Repository<Service>
    ) {

    }

    findAll() : Promise<Service[]>{
        return this.serviceRepository.find();
    }

    findOne(id:number): Promise<Service|null>{
        return this.serviceRepository.findOneBy({serviceID:id});
    }

    async create(service : CreateServiceDTO) : Promise<Service|null> {
        let serviceEntity = new Service()
        serviceEntity.serviceName = service.serviceName
        serviceEntity.servicePrice = service.servicePrice
        Logger.log(JSON.stringify(serviceEntity))  
        let result = await serviceEntity.save()
    
        return result
    
    }

    update(updateServiceDTO : UpdateServiceDTO) : Promise<Service|null>{
        return this.serviceRepository.save(updateServiceDTO);
    }

    async DeleteQueryBuilder(id:number) : Promise<void> {
        await this.serviceRepository.delete({serviceID:id})
    }
}