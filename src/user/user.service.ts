import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "src/config";
import { IUserResponse } from "src/user/types/userResponse.types";
import { LoginUserDto } from "./dto/login-user.dto";
import { compare } from "bcrypt";
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>
    ) {}

    public async createUser(createUserDto: CreateUserDto): Promise<UserEntity>{
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

        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)
        return await this.userRepository.save(newUser)
    }

    public findById(id: number) {
        return this.userRepository.findOne({
            where: { id }
        })
    }

    private generateJWT(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            password: user.password
        }, JWT_SECRET)
    }

    public buildUserResponse(user: UserEntity): IUserResponse {
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

    public async updateUser(userId: number, updateUserDto: UpdateUserDto) {
        const user = await this.findById(userId)
        Object.assign(user, updateUserDto)
        return await this.userRepository.save(user)
    }
}