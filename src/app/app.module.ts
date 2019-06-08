import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FirstService, SecondService } from './services';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [
    { provide: 'foo', useClass: FirstService, multi: true },
    { provide: 'foo', useClass: SecondService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
