import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './signup.dto';
import { User } from './user.entities';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<User> {
        return this.userService.signUp(signUpDto)
    }
}