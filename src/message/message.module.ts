import { Module } from '@nestjs/common';
import { MessageQueueModule } from 'src/message-queue/message-queue.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';

@Module({
  imports: [MessageQueueModule, PrismaModule],
  providers: [MessageService, MessageRepository],
  exports: [MessageService],
})
export class MessageModule {}
