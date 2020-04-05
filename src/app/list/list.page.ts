import { Component, OnInit } from '@angular/core';
import { AlldataService } from '../alldata.service';
import { ToastController,Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { DatabaseService, Dev } from '../../app/services/database.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage   {

item:any ={};
  pdfObj = null;
  constructor( private sqlite: SQLite,private db: DatabaseService,public loadingController: LoadingController,public toastController: ToastController,public data:AlldataService,public modalController: ModalController,private plt: Platform, public fileOpener: FileOpener,private file: File) {

}
}








