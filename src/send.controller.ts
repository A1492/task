import {Get, Controller, Req, Res, HttpStatus} from '@nestjs/common'
import { AppService } from './app.service'
import { Request, Response } from 'express';

@Controller()

export class SendGoogle {
    constructor(private readonly AuthService: AppService) {}

    @Get('clients')
    async pullData(@Req() req: Request, @Res() res: Response) {
        try {
        await this.AuthService.exportToGoogleSheet()

        return res.status(HttpStatus.OK).send({message: 'Заполняю таблицу'})
        }
        catch (error) {
            if (error.response?.status === 400) {
                return res.status(HttpStatus.BAD_REQUEST).send({message: 'Пользователь не авторизован'})
            }
        }
    }
}