import { Injectable, LoggerService } from '@nestjs/common';
import { telemetry, Telemetry } from '@withjoy/telemetry';

@Injectable()
export class TelemetryService implements LoggerService {
  private telemetry: Telemetry;
  constructor() {
    this.telemetry = telemetry;
  }
  log(...args: Parameters<typeof Telemetry['prototype']['info']>) {
    this.telemetry.info(args[0]);
  }
  warn(message: Parameters<typeof Telemetry['prototype']['warn']>) {
    this.telemetry.warn(message);
  }
  error(message: Parameters<typeof Telemetry['prototype']['error']>) {
    this.telemetry.error(message);
  }
  debug(message: Parameters<typeof Telemetry['prototype']['debug']>) {
    this.telemetry.debug(message);
  }
  verbose(message: Parameters<typeof Telemetry['prototype']['info']>) {
    this.telemetry.info(message);
  }
}
