import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventsPage } from './events';

import { InAppBrowser } from "@ionic-native/in-app-browser";

@NgModule({
  declarations: [
    EventsPage,
   ],
  imports: [
    IonicPageModule.forChild(EventsPage),
  ]
})
export class EventsPageModule { }
