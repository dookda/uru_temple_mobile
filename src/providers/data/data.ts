import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DataProvider {

  private url: string = 'http://cgi.uru.ac.th:3000/api';

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  getFeature(lat: number, lng: number) {
    const url = 'http://www.cgi.uru.ac.th/geoserver/fire_support/ows?service=WFS&version=1.0.0&request=GetFeature' +
      '&typeName=fire_support%3Atemple_4326' +
      '&CQL_FILTER=DWITHIN(geom,POINT(' + lng + '%20' + lat + '),50,meters)' +
      '&outputFormat=application%2Fjson';

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe((res: any) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
    })
  }

  getPlace() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/urbanPlace').subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error)
      })
    })
  }

  addUrbanComment(data: any) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/wk_addUrbanComment', data).subscribe((res: any) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
    })
  }

  getComment() {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + '/wk_urbanSelect').subscribe((res: any) => {
        resolve(res);
      }, (error) => {
        reject(error)
      })
    })
  }

  addCommentReply(data: any) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(this.url + '/wk_urbanCommentReply', data).subscribe((res: any) => {
        resolve(res)
      }, (error) => {
        reject(error)
      })
    })
  }

  getTemple() {
    const json = 'http://www.cgi.uru.ac.th/geoserver/fire_support/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=fire_support%3Atemple_4326&outputFormat=application%2Fjson';
    return new Promise((resolve: any, reject: any) => {
      this.http.get(json).subscribe((res: any) => {
        resolve(res);
      }, (error: any) => {
        reject(error);
      });
    });
  }

  getTempleList() {
    const json = 'http://cgi.uru.ac.th:3000/temple/temple';
    return new Promise((resolve: any, reject: any) => {
      this.http.get(json).subscribe((res: any) => {
        resolve(res);
      }, (error: any) => {
        reject(error);
      })
    })
  }

}
