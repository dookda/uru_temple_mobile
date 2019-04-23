import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-desc',
  templateUrl: 'desc.html',
})
export class DescPage {
  public tName: any = '';
  public tNamet: any = '';
  public marker: any;
  public lyrGroup: any;
  public imgArr: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public dataProvider: DataProvider
  ) {
  }

  ionViewDidLoad() {
    const fs = this.navParams.get('feature');
    console.log(fs);
    const tName = fs.wat;
    this.getImage(tName);
  }

  getImage(e: any) {
    console.log(e);
    let imgCount;
    if (e === 'วัดใหญ่ท่าเสา') {
      this.tName = 'yaithasao';
      this.tNamet = 'วัดใหญ่ท่าเสา';
      imgCount = 50;
    } else if (e === 'วัดพระฝางสวางคมุนี') {
      this.tName = 'prafang';
      this.tNamet = 'วัดพระฝางสวางคมุนี';
      imgCount = 104;
    } else if (e === 'อนุสาวรีย์พระยาพิชัยดาบหัก') {
      this.tName = 'payapichai';
      this.tNamet = 'อนุสาวรีย์พระยาพิชัยดาบหัก';
      imgCount = 8;
    } else if (e === 'วัดท่าถนน') {
      this.tName = 'thatanoon';
      this.tNamet = 'วัดท่าถนน';
      imgCount = 10;
    } else if (e === 'วัดพระยืน') {
      this.tName = 'payean';
      this.tNamet = 'วัดพระยืน';
      imgCount = 6;
    } else if (e === 'วัดพระแท่นศิลาอาสน์') {
      this.tName = 'pratansilaart';
      this.tNamet = 'วัดพระแท่นศิลาอาสน์';
      imgCount = 76;
    } else if (e === 'วัดพระบรมธาตุทุ่งยั้ง') {
      this.tName = 'tungyang';
      this.tNamet = 'วัดพระบรมธาตุทุ่งยั้ง';
      imgCount = 18;
    } else if (e === 'วัดบ้านแก่งใต้ พระอกแตก') {
      this.tName = 'kengtai';
      this.tNamet = 'วัดบ้านแก่งใต้ พระอกแตก';
      imgCount = 20;
    } else if (e === 'วัดขวางชัยภูมิ') {
      this.tName = 'khangchaiyaphoom';
      this.tNamet = 'วัดขวางชัยภูมิ';
      imgCount = 80;
    } else if (e === 'วัดมหาธาตุ') {
      this.tName = 'mahathat';
      this.tNamet = 'วัดมหาธาตุ';
      imgCount = 5;
    } else if (e === 'วัดหน้าพระธาตุ') {
      this.tName = 'napahat';
      this.tNamet = 'วัดหน้าพระธาตุ';
      imgCount = 10;
    } else if (e === 'บ้านเกิดพระยาพิชัย อนุสรณ์สถาน') {
      this.tName = 'payapichai_home';
      this.tNamet = 'บ้านเกิดพระยาพิชัย อนุสรณ์สถาน';
      imgCount = 10;
    } else if (e === 'วัดน้ำพี้') {
      this.tName = 'namphee';
      this.tNamet = 'วัดน้ำพี้';
      imgCount = 36;
    } else if (e === 'วัดปากถ้ำฉลอง') {
      this.tName = 'pakhuichalong';
      this.tNamet = 'วัดปากถ้ำฉลอง';
      imgCount = 74;
    } else if (e === 'วัดศรีสะอาดโพธิ์ชัย') {
      this.tName = 'srisaartphochai';
      this.tNamet = 'วัดศรีสะอาดโพธิ์ชัย';
      imgCount = 46;
    } else if (e === 'วัดกกต้อง') {
      this.tName = 'koktong';
      this.tNamet = 'วัดกกต้อง';
      imgCount = 52;
    } else if (e === 'วัดโพธิ์ชัยศรี') {
      this.tName = 'phochaisri';
      this.tNamet = 'วัดโพธิ์ชัยศรี';
      imgCount = 312;
    }

    this.imgArr = [];

    for (let i = 1; i < imgCount; i++) {
      this.imgArr.push('http://cgi.uru.ac.th/wat/out/' + this.tName + '/img (' + i + ').jpg');
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
    // console.log('close')
  }
}

export interface FeatureObj {
  list?: string;
  no?: number;
  rmk?: string;
  area?: number;
}

export interface DataReport {
  code?: string;
  lat?: number;
  lng?: number;
  list?: string;
  no?: number;
  rmk?: string;
  ucomment?: string;
  uphone?: string;
  uname?: string;
}
