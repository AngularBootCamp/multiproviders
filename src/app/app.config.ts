import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';

import { ConsoleLogHandler } from './loggers/console-log-handler';
import { LogHandler } from './loggers/log-handler';
import { LogService } from './loggers/log.service';
import { TelemetryLogHandler } from './loggers/telemetry-log-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    LogService,
    {
      provide: LogHandler,
      useClass: ConsoleLogHandler,
      multi: true
    },
    {
      provide: LogHandler,
      useClass: TelemetryLogHandler,
      multi: true
    },
    provideHttpClient()
  ]
};
