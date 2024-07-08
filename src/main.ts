// https://github.com/stackblitz/core/issues/2366
import 'zone.js'; // Avoid error in StackBlitz for Angular polyfill

import { provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { ConsoleLogHandler } from './app/loggers/console-log-handler';
import { LogHandler } from './app/loggers/log-handler';
import { LogService } from './app/loggers/log.service';
import { TelemetryLogHandler } from './app/loggers/telemetry-log-handler';

bootstrapApplication(AppComponent, {
  providers: [
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
}).catch(err => console.error(err));
