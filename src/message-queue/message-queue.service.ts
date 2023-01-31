import { Injectable } from '@nestjs/common';
import {
  QueueServicePublisher,
  EmailMessage,
  PostOfficeGenericGuestEmail,
} from '@withjoy/message-queue';
import { serverConfig } from 'src/app.config';

@Injectable()
export class MessageQueueService {
  private queueServicePublisher: QueueServicePublisher;

  constructor() {
    this.queueServicePublisher = new QueueServicePublisher({
      accountName: serverConfig.azure.accountName,
      accountKey: serverConfig.azure.accountKey,
    });
  }

  async sendPostOfficeGenericGuestEmail(
    emailData: EmailMessage<PostOfficeGenericGuestEmail>,
    userId: string,
  ) {
    await this.queueServicePublisher.publishMessage({
      message: {
        queueName: 'email',
        userId,
        data: emailData,
      },
    });
    return 'Message sent to queue.';
  }
}
