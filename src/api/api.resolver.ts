import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserFragment } from '@withjoy/server-core/dist/graphql/generated.typings';
import { CurrentUserContext } from 'src/joy.context';
import { PostOfficeGenericGuestEmailInput } from './api.inputs';
import { MessageService } from '../message/message.service';

@Resolver(() => String)
export class ApiResolver {
  constructor(private messageService: MessageService) {}

  @Mutation(() => String)
  sendPostOfficeGenericGuestEmail(
    @CurrentUserContext() currentUser: UserFragment,
    @Args('payload') payload: PostOfficeGenericGuestEmailInput,
  ) {
    return this.messageService.sendPostOfficeGenericGuestEmail(
      {
        toEmail: payload.toEmail,
        fromEmail: payload.fromEmail,
        subject: payload.subject,
        emailInfo: {
          ...payload,
          emailType: 'postOfficeGenericGuestEmail',
        },
      },
      currentUser.id,
    );
  }
}
