import { Injectable } from '@nestjs/common';
import {
  EmailMessage,
  PostOfficeGenericGuestEmail,
} from '@withjoy/message-queue';
import { MessageQueueService } from 'src/message-queue/message-queue.service';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageQueueService: MessageQueueService,
    private readonly messageRepository: MessageRepository,
  ) {}

  async sendPostOfficeGenericGuestEmail(
    args: EmailMessage<PostOfficeGenericGuestEmail>,
    userId: string,
  ) {
    try {
      await this.messageQueueService.sendPostOfficeGenericGuestEmail(
        args,
        userId,
      );
      await this.messageRepository.create({
        toEmail: args.toEmail,
        fromEmail: args.fromEmail,
      });
      return 'Message created and sent to queue.';
    } catch (err) {
      throw err;
    }
  }
}
