import { User } from "src/user/entity/user.entity";

export type UserType = Omit<User, 'hashPassword'>