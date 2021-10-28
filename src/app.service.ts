import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly envName: string;

  constructor(configService: ConfigService) {
    this.envName = configService.get<string>('NEST_ENV');
  }

  getHealthStatus(): string {
    return `up-and-running, ENV=${this.envName}\n`;
  }
}
