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

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      context: async (context) => {
        return buildJoyContext(context);
      },
    }),
    TelemetryModule,
    HealthModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const { preludes: preludesMiddleware } = getDefaultMiddleware();
    consumer.apply(...preludesMiddleware).forRoutes('*');
  }
}
