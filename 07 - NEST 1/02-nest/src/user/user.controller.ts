import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Next,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NextFunction, Response } from 'express';
import { RequestUser, UserLogin } from './types/user';
import { UserGuard } from './user.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const response = await this.userService.register(createUserDto);
      res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('/login')
  async login(@Body() user: UserLogin, @Res() res: Response): Promise<void> {
    try {
      const response = await this.userService.login(user);
      res
        .status(HttpStatus.OK)
        .cookie('token', response, { httpOnly: true })
        .json({ response: 'Login OK', token: response });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }

   @Get('/profile')
  @UseGuards(UserGuard) 
  profile(@Request() req: RequestUser){
    return this.userService.profile(req);
  }
}
