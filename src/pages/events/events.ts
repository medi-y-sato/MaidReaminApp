import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventsReaderProvider } from "../../providers/events-reader/events-reader"

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  eventList

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private eventsReaderProvider: EventsReaderProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');

    this.eventsReaderProvider.getEventsList().then(
      res => { this.eventList = res })
      .catch(error => console.error(error))
  }

  public link(url){
    // todo : inappbrowserよぶ
  }

}
