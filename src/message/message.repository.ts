import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

interface CreateMessageArgs {
  toEmail: string;
  fromEmail: string;
}

@Injectable()
export class MessageRepository {
  constructor(private prismaService: PrismaService) {}

  async byId(id: string) {
    return this.prismaService.message.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async create(args: CreateMessageArgs) {
    return this.prismaService.message.create({
      data: this.validateCreate(args),
    });
  }

  private validateCreate({ toEmail, fromEmail }: CreateMessageArgs) {
    return Prisma.validator<Prisma.MessageCreateInput>()({
      toEmail,
      fromEmail,
      status: 'created',
    });
  }
}
