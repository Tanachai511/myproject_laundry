import { IsIn, IsNotEmpty, Matches } from "class-validator";
import { Role } from "src/auth/role.enum";

export class SignUpDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'Password must be minimum eight characters, at least one letter and one number.'
    })
    password: string

    @IsNotEmpty()
    @IsIn([Role.User, Role.Admin]) 
    role: Role = Role.User;
}