import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";

import { InAppBrowser } from "@ionic-native/in-app-browser";

import { EventsReaderProvider } from "../../providers/events-reader/events-reader";

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-events",
  templateUrl: "events.html"
})
export class EventsPage {
  eventList;
  pickupList;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventsReaderProvider: EventsReaderProvider, private inAppBrowser: InAppBrowser, private platform: Platform) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EventsPage");

    this.platform.ready().then(res => {
      this.eventsReaderProvider
        .getEventsList()
        .then(res => {
          this.eventList = res;
        })
        .catch(error => console.error(error));

      this.eventsReaderProvider
        .getPickupList()
        .then(res => {
          this.pickupList = res;
        })
        .catch(error => console.error(error));
    });
  }

  public link(url) {
    this.inAppBrowser.create(url);
  }
}
