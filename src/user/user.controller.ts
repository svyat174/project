import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entity/user.entity";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('users')
    public async createUser(@Body('user') createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto)
    }
}