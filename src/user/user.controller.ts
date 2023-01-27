import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUserResponse } from "src/user/types/userResponse.types";
import { LoginUserDto } from "./dto/login-user.dto";
import { ExpressRequestInterface } from "src/types/expressRequest.interface";
import { UserDecorator } from "src/user/decorators/user.decorator";
import { UserEntity } from "./entities/user.entity";
import { AuthGuard } from "./guards/auth.guard";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post('users')
    @UsePipes(new ValidationPipe())
    public async createUser(@Body('user') createUserDto: CreateUserDto): Promise<IUserResponse> {
        const user = await this.userService.createUser(createUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Post('users/login')
    @UsePipes(new ValidationPipe())
    public async login(@Body('user') loginUserDto: LoginUserDto) {
        const user = await this.userService.login(loginUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('user')
    @UseGuards(AuthGuard)
    public async currentUser(@UserDecorator() user: UserEntity) {
        return this.userService.buildUserResponse(user)
    }

    @Put('user')
    @UseGuards(AuthGuard)
    public async updateCurrentUser(
        @UserDecorator('id') currentUserId: number,
        @Body('user') updateUserDto: UpdateUserDto
    ): Promise<IUserResponse> {
        const user = await this.userService.updateUser(currentUserId, updateUserDto)
        return this.userService.buildUserResponse(user)
    }
}