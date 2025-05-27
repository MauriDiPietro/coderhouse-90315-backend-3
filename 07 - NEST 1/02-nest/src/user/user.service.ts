import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RequestUser, UserLogin } from './types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private JwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.UserModel.findOne({ email });
  }

  async register(createUserDto: CreateUserDto): Promise<UserDocument | null> {
    try {
      const { email } = createUserDto;
      const existingUser = await this.findByEmail(email);
      if (existingUser) throw new Error('User already exists');
      return await this.UserModel.create(createUserDto);
    } catch (error) {
      throw new Error('Error registering user');
    }
  }

  generateToken(user: UserDocument): string {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };
    return this.JwtService.sign(payload);
  }

  async login(user: UserLogin): Promise<string | null> {
    try {
      const { email } = user;
      const existingUser = await this.findByEmail(email);
      if (!existingUser) throw new Error('User not found');
      return this.generateToken(existingUser);
    } catch (error) {
      throw new Error('Error logging in user');
    }
  }

  profile(req: RequestUser) {
    return req.user;
  }
}
