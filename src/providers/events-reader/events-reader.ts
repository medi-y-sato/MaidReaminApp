import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";
import { Http } from "@angular/http";
import { HTTP } from "@ionic-native/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

/*
  Generated class for the EventsReaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsReaderProvider {
  targetUrl: string = "https://maidreamin.com/event/";
  baseDomainUrl: string = "https://maidreamin.com";

  constructor(public http: Http, private platform: Platform, private nativeHttp: HTTP) {
    console.log("Hello EventsReaderProvider Provider");
  }

  public getPickupList(dateString?: string) {
    return new Promise((resolve, reject) => {
      let eventList = [];
      if (!dateString) {
        dateString = "2017/09";
      }
      this.getHtml(dateString)
        .then(res => {
          let resData;
          if (res.data) {
            resData = res.data;
          } else {
            resData = res.text();
          }
          let parser = new DOMParser();
          let htmlData = parser.parseFromString(resData, "text/html");

          let eventsListHtml = htmlData
            .getElementsByClassName("p-pickups")
            .item(0)
            .getElementsByClassName("c-column");

          for (let i = 0; i < eventsListHtml.length; i++) {
            const eventData = {
              link: this.baseDomainUrl +eventsListHtml.item(i).getElementsByTagName("a")[0].attributes[0].value,
              thumbnail: eventsListHtml
                .item(i)
                .getElementsByClassName("c-thumb")[0]
                ["style"].backgroundImage.match(/url\("(.*)"\)/)[1],
              date: eventsListHtml.item(i).getElementsByClassName("c-thumb__date")[0]["innerText"],
              title: eventsListHtml.item(i).getElementsByClassName("p-pickup__ttl")[0]["innerText"],
              ex: eventsListHtml.item(i).getElementsByClassName("p-pickup__ex")[0]["innerText"]
            };
            eventList.push(eventData);
          }
          resolve(eventList);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getEventsList(dateString?: string) {
    return new Promise((resolve, reject) => {
      let eventList = [];
      if (!dateString) {
        dateString = "2017/09";
      }
      this.getHtml(dateString)
        .then(res => {
          let resData;
          if (res.data) {
            resData = res.data;
          } else {
            resData = res.text();
          }
          let parser = new DOMParser();
          let htmlData = parser.parseFromString(resData, "text/html");

          let eventsListHtml = htmlData
            .getElementsByClassName("p-events-sec__list")
            .item(0)
            .getElementsByClassName("p-event");

          for (let i = 0; i < eventsListHtml.length; i++) {
            const eventData = {
              url: this.baseDomainUrl + eventsListHtml.item(i).getElementsByTagName("a")[0].attributes[0].value,
              time: eventsListHtml
                .item(i)
                .getElementsByClassName("p-event__time")
                .item(0)["innerText"],
              shopname: eventsListHtml.item(i).getElementsByClassName("p-event__shop-name")[0]["innerText"],
              title: eventsListHtml.item(i).getElementsByClassName("p-event__title")[0]["innerText"]
            };
            eventList.push(eventData);
          }
          resolve(eventList);
        })
        .catch(error => reject(error));
    });
  }

  private getHtml(dateString) {
    let returnObject;
    if (this.platform.is("cordova")) {
      returnObject = this.nativeHttp.get(this.targetUrl + "?date=" + dateString, {}, {});
    } else {
      returnObject = this.http.get(this.targetUrl + "?date=" + dateString).toPromise();
    }
    return returnObject;
  }
}
