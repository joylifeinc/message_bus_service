/* tslint:disable */

// before we even import anything else, ensure that `dotenv` does its job
import { loadDotEnv } from '@withjoy/server-core';
const { env, isProduction, isTest } = loadDotEnv();
export { isProduction, isTest };

import {
  ApolloEnvironmentConfig,
  deriveApolloEnvironmentConfig,
} from '@withjoy/server-core';
import {
  configureGlobalTelemetry,
  deriveTelemetryConfigFromEnvironment,
} from '@withjoy/telemetry';

// now we've setup the right `.env` variables and can identify ourselves
configureGlobalTelemetry(deriveTelemetryConfigFromEnvironment(), {
  app: 'schedule_service',
});

// the conventional timezone to use when one is not specified.
//   this does *not* serve the same purpose as LEGACY_DEFAULT_INFO_TZID;
//   it's a CYA for situations when we need a timezone but don't have one to work with
export const SAFE_TZID = 'Etc/UTC';

export interface redis {
  host: string;
}

export interface ServerConfig {
  port: string;
  clients: {
    stitch: string;
    identity: string;
  };
  redis: {
    host: string;
    port: number;
    enabled: boolean;
  };
  apollo: ApolloEnvironmentConfig;
  azure: {
    queueEnabled: boolean;
    accountName: string;
    accountKey: string;
  };
}

export const serverConfig: ServerConfig = {
  port: env.PORT as string,
  clients: {
    stitch: env.STITCH_SERVICE as string,
    identity: env.IDENTITY_SERVICE as string,
  },
  redis: {
    host: env.REDIS_SERVICE_HOST as string,
    port: parseInt(env.REDIS_SERVICE_PORT || '6379', 10) as number,
    enabled: !!env.REDIS_SERVICE_HOST, // presence of config
  },
  apollo: deriveApolloEnvironmentConfig({
    serviceName: 'event',
    servicePort: env.PORT as string,
  }),
  azure: {
    // both settings must be present to enable the queue
    queueEnabled: Boolean(
      env.AZ_QUEUE_ACCOUNT_NAME && env.AZ_QUEUE_ACCOUNT_KEY,
    ),
    accountName: env.AZ_QUEUE_ACCOUNT_NAME as string,
    accountKey: env.AZ_QUEUE_ACCOUNT_KEY as string,
  },
};
