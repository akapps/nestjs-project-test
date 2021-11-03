import {
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService, LocalAuthGuard } from './auth';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

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

  /**
   * Provides a route where the user can login to the application - and get their JWT token.
   *
   * Their credentials must match with a user defined in UsersService, or they will be rejected (401).
   */
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
