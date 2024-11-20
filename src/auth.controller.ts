import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './createUserDto';
import { Request, Response } from 'express';

@Controller('auth')
export class Authentication {
  constructor(private readonly AuthService: AppService) {}

  @Post('registration')
  async registration(@Body() createUserDto: CreateUserDto, @Req() req: Request, @Res() res: Response) {
    try {
      const { username } = createUserDto;

      const token = await this.AuthService.registerUser(username);


      return res.status(HttpStatus.CREATED).send({
        message: token
      });
    } catch (error) {
      if (error.response?.status === 400) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'Пользователь уже существует',
        });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Произошла ошибка при регистрации',
        error: error.message,
      });
    }
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Req() req: Request, @Res() res: Response) {
    try {
      const { username } = createUserDto;

      const token = await this.AuthService.loginUser(username);

      return res.status(HttpStatus.OK).send({
        message: token,
      });
    } catch (error) {
      if (error.response?.status === 400) {
        return res.status(HttpStatus.BAD_REQUEST).send({
          message: 'Пользователь с таким именем существует',
        });
      }
    }
  }
}
