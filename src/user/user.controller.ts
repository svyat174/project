import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { IUserResponse } from "src/user/types/userResponse.types";
import { LoginUserDto } from "./dto/login-user.dto";
import { Request } from "express";
import { ExpressRequestInterface } from "src/types/expressRequest.interface";

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
    public async currentUser(@Req() request: ExpressRequestInterface) {
        return this.userService.buildUserResponse(request.user)
    }
}