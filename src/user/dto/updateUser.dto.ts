import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUserDto{
    readonly username: string

    readonly email: string

    @IsNotEmpty()
    readonly bio: string

    @IsNotEmpty()
    @IsOptional()
    readonly image: string
}