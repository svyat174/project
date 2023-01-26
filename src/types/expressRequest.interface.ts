import { Request } from "express";
import { User } from "src/user/entity/user.entity";

export interface ExpressRequestInterface extends Request {
    user?: User
}