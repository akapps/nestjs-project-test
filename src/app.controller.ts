import { Controller, Get, Header, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @Header('Content-Type', 'text/plain')
  getHello(): string {
    return this.appService.getHealthStatus();
  }

  @Get('type-me/:me')
  @Header('Content-Type', 'text/plain')
  typeMe(@Param('me', ParseIntPipe) me: number): string {
    return `you are a ${typeof me}`;
  }
}
