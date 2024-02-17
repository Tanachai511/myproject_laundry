import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './signup.dto';
import * as bcrypt from 'bcrypt'
import { User } from './user.entities';
import { Entity, Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ) {}

    async signUp(signupUpDto: SignUpDto): Promise<User> {
            const {
                username,
                password,
            } = signupUpDto
    
            const hashedPassword = await bcrypt.hashSync(password, 10)
    
            const user = this.userRepository.create({
                username,
                password: hashedPassword,
            })

            Logger.log(JSON.stringify(user))  
    
            return await this.userRepository.save(user)
    }

    async findOneUser(username: string): Promise<User | undefined> {
        const user = await this.userRepository.findOneBy({ username : username })
        return user
    }
}