// src/some.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvLoaderService {
  constructor(private readonly configService: ConfigService) {}

  getDatabaseUrl(): string {
    return this.configService.get<string>('MONGO_DB_URI');
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }
}
