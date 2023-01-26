import { User } from "src/user/entity/user.entity";
import { UserType } from "./user.types";

export interface IUserResponse {
    user: UserType & {token: string}
}