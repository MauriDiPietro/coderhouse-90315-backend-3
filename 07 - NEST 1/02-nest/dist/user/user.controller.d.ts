import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NextFunction, Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDto, res: Response, next: NextFunction): Promise<void>;
}
