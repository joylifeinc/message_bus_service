import { InputType, Field } from '@nestjs/graphql';
import { isUUID, Validate } from 'class-validator';

@InputType()
export class PostOfficeGenericGuestEmailInput {
  @Field(() => String)
  fromEmail: string;

  @Field(() => String)
  toEmail: string;

  @Validate(isUUID)
  @Field(() => String, {
    description: 'ID of the event the email is sent on behalf of',
  })
  eventId: string;

  @Validate(isUUID)
  @Field(() => String, {
    nullable: true,
    description: 'ID of the person the email is sent to',
  })
  sentToPersonId: string;

  @Validate(isUUID)
  @Field(() => String, {
    nullable: true,
    description: 'ID of the uuser the email is sent to',
  })
  sentToUserId: string;

  @Field(() => String)
  subject: string;

  @Field(() => String)
  replyToEmail: string;

  @Field(() => String)
  greeting: string;

  @Field(() => String)
  message: string;

  @Field(() => String)
  eventName: string;

  @Field(() => String)
  eventPassword: string;

  @Field(() => String)
  eventWebsite: string;

  @Field(() => String, { nullable: true })
  eventLink?: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => Boolean)
  includeAppInstructions: boolean;

  @Field(() => Boolean)
  includeWebsiteDetails: boolean;

  @Field(() => Boolean)
  includeEventPassword: boolean;

  @Field(() => String, { nullable: true })
  footerText?: string;

  @Field(() => String, { nullable: true })
  salutation?: string;
}
