import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RequestUser, UserLogin } from './types/user';
export declare class UserService {
    private UserModel;
    private JwtService;
    constructor(UserModel: Model<UserDocument>, JwtService: JwtService);
    findByEmail(email: string): Promise<UserDocument | null>;
    register(createUserDto: CreateUserDto): Promise<UserDocument | null>;
    generateToken(user: UserDocument): string;
    login(user: UserLogin): Promise<string | null>;
    profile(req: RequestUser): {
        first_name: string;
        last_name: string;
        email: string;
        role: string;
    };
}
