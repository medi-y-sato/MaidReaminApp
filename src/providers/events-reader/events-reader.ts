import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the EventsReaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventsReaderProvider {

  targetUrl: string = "/assets/dummy.html";  //"https://maidreamin.com/event/";

  constructor(public http: Http) {
    console.log('Hello EventsReaderProvider Provider');
  }

  public getEventsList() {
    return new Promise((resolve, reject) => {
      let eventList = []
      this.getHtml().then(res => {
        let parser = new DOMParser();
        let htmlData = parser.parseFromString(res, "text/html");

        let eventsListHtml = htmlData
          .getElementsByClassName("p-events-sec__list").item(0)
          .getElementsByClassName("p-event")

        for (let i = 0; i < eventsListHtml.length; i++) {
          let url = eventsListHtml.item(i).getElementsByTagName("a")[0].href
          url = url.replace(/http:\/\/(.*?)\//,"https://maidreamin.com/event/")
          const eventData = {
            url: url,
            time: eventsListHtml.item(i).getElementsByClassName("p-event__time").item(0)["innerText"],
            shopname: eventsListHtml.item(i).getElementsByClassName("p-event__shop-name")[0]["innerText"],
            title: eventsListHtml.item(i).getElementsByClassName("p-event__title")[0]["innerText"],
          }
          eventList.push(eventData)
        }
      })
      resolve(eventList)
    })

  }

  private getHtml() {
    return this.http.get(this.targetUrl)
      .map(res => res.text())
      .toPromise()
  }

}
