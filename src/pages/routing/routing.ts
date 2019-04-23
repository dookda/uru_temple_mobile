import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-routing',
  templateUrl: 'routing.html',
})
export class RoutingPage {
  public startList: any;
  public endList: any;
  public start: any;
  public end: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public dataProvider: DataProvider
  ) {
  }

  ionViewDidLoad() {
    // const pos = this.navParams.get('data');
    // console.log(pos);
    this.getListStart();
    this.getListEnd();
  }

  getListStart() {
    this.dataProvider.getTempleList().then((res: any) => {
      console.log(res);
      this.startList = res.data;
    })
  }

  getListEnd() {
    this.dataProvider.getTempleList().then((res: any) => {
      console.log(res);
      this.endList = res.data;
    })
  }

  selStart(e: any) {
    // console.log(e);
  }

  calRoute() {
    // console.log(this.start, this.end)
    const r = {
      start: this.start,
      end: this.end
    }
    this.viewCtrl.dismiss(r);
  }



  closeModal() {
    this.viewCtrl.dismiss();
    // console.log('close')
  }

}
