import { UserEntity } from "src/user/entities/user.entity";
import { UserType } from "./user.types";

export interface IUserResponse {
    user: UserType & {token: string}
}