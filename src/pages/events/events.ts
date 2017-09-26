import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";

import { InAppBrowser } from "@ionic-native/in-app-browser";
import { BrowserTab } from "@ionic-native/browser-tab";

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
  targetDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventsReaderProvider: EventsReaderProvider, private inAppBrowser: InAppBrowser, private platform: Platform, private browserTab: BrowserTab) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad EventsPage");

    this.platform.ready().then(res => {
      this.targetDate = new Date().toISOString();
      this.changeDate();
    });
  }

  public changeDate() {
    const targetDateReplaced = this.targetDate.replace(/-/g, "/").substr(0, 7);
    this.eventsReaderProvider
      .getEventsList(targetDateReplaced)
      .then(res => {
        this.eventList = res;
      })
      .catch(error => console.error(error));

    this.eventsReaderProvider
      .getPickupList(targetDateReplaced)
      .then(res => {
        this.pickupList = res;
      })
      .catch(error => console.error(error));
  }

  public link(url) {
    console.log("url : " + url);
    this.browserTab
      .isAvailable()
      .then((isAvailable: boolean) => {
        if (isAvailable) {
          this.browserTab.openUrl(url);
        } else {
          this.inAppBrowser.create(url);
        }
      })
      .catch(error => {
        this.inAppBrowser.create(url);
        console.error(error);
      });
  }
}
