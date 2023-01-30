import { Context, ContextConstructorArgs } from '@withjoy/server-core';
import { serverConfig } from 'src/app.config';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserFragment } from '@withjoy/server-core/dist/graphql/generated.typings';

export class JoyContext extends Context {}

export const buildJoyContext = async (args: ContextConstructorArgs) => {
  const { req } = args;
  const joyContext = new JoyContext({
    req,
    identityUrl: serverConfig.clients.identity,
  });
  await joyContext.me();
  return joyContext.currentUser;
};

export const CurrentUserContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().currentUser as UserFragment,
);
