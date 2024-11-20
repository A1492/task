import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Authentication } from './auth.controller'
import { SendGoogle } from './send.controller'

@Module({
  imports: [],
  controllers: [Authentication, SendGoogle],
  providers: [AppService],
})
export class AppModule {}
