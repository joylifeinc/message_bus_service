import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HealthController } from './health.controller';
import { PrismaHealthIndicator } from './prisma.check';

@Module({
  imports: [TerminusModule, PrismaModule],
  providers: [PrismaHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
