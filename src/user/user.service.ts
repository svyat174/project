import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "src/config";
import { IUserResponse } from "src/user/types/userResponse.types";
import { LoginUserDto } from "./dto/login-user.dto";
import { compare } from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>
    ) {}

    public async createUser(createUserDto: CreateUserDto): Promise<User>{
        const userByEmail = await this.userRepository.findOne({
            where: {email: createUserDto.email}
        })

        const userByUsername = await this.userRepository.findOne({
            where: {username: createUserDto.username}
        })

        if (userByEmail || userByUsername) {
            throw new HttpException(
                'Email or Username are taken',
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        const newUser = new User()
        Object.assign(newUser, createUserDto)
        return await this.userRepository.save(newUser)
    }

    public findById(id: number) {
        return this.userRepository.findOne({
            where: { id }
        })
    }

    private generateJWT(user: User): string {
        return sign({
            id: user.id,
            username: user.username,
            password: user.password
        }, JWT_SECRET)
    }

    public buildUserResponse(user: User): IUserResponse {
        return {
            user: {
                ...user,
                token: this.generateJWT(user)
            }
        }
    }

    public async login(loginUserDto: LoginUserDto) {
        const user = await this.userRepository.findOne({
            where: {email: loginUserDto.email},
            select: ['id', 'email', 'username', 'bio', 'image', 'password']
        })
        if (!user) {
            throw new HttpException(
                'Credential are not valid',
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }
        const isPasswordCorrect = await compare(
            loginUserDto.password,
            user.password
        )
        if (!isPasswordCorrect) {
            throw new HttpException(
                'Credential are not valid',
                HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        delete user.password

        return user
    }
}