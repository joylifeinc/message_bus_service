import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { ApiResolver } from './api.resolver';

@Module({
  imports: [MessageModule],
  providers: [ApiResolver, ApiResolver],
})
export class ApiModule {}
