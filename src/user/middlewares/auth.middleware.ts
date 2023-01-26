import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "src/config";
import { ExpressRequestInterface } from "src/types/expressRequest.interface";
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly userService: UserService){}

    async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
        if (!req.headers.authorization) {
            req.user = null
            next()
            return
        }

        const token = req.headers.authorization.split(' ')[1]
        
        try {
            const decode = verify(token, JWT_SECRET)
            if (typeof decode === 'string') {
                console.error(`verify returns string ${decode}`)
                return
            }

            const user = await this.userService.findById(decode.id)
                req.user = user
                next()

        } catch (e) {
            req.user = null
            next()
        }
    }
}