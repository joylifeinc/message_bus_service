import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { buildJoyContext } from './joy.context';
import { getDefaultMiddleware } from '@withjoy/server-core';
import { TelemetryModule } from './telemetry/telemetry.module';
import { HealthModule } from './health/health.module';
import { MessageQueueModule } from './message-queue/message-queue.module';
import { ApiModule } from './api/api.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: async (context) => {
        const joyContext = await buildJoyContext(context);
        return joyContext;
      },
    }),
    TelemetryModule,
    HealthModule,
    MessageQueueModule,
    ApiModule,
    MessageModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const { preludes: preludesMiddleware } = getDefaultMiddleware();
    consumer.apply(...preludesMiddleware).forRoutes('*');
  }
}
