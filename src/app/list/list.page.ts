import { Component, OnInit } from '@angular/core';
import { AlldataService } from '../alldata.service';
import { ToastController,Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { DatabaseService, Dev } from '../../app/services/database.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { File } from '@ionic-native/file/ngx';
import { AlertController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage   {

item:any ={};
  pdfObj = null;
  constructor( public alldata:AlldataService,public alertController: AlertController,private sqlite: SQLite,private db: DatabaseService,public loadingController: LoadingController,public toastController: ToastController,public data:AlldataService,public modalController: ModalController,private plt: Platform, public fileOpener: FileOpener,private file: File) {
this.item =this.data.userprofile
console.log(this.item)
this.hist();
}

history =[]
        hist()
        {
          this.history =[];
          firebase.firestore().collection('ClientHistory').where('clientuid',"==",this.alldata.clientuid).orderBy('time', 'desc').get().then(val=>{
          val.forEach(res=>{
            this.history.push({...{id:res.id},...res.data()});
            console.log({...{id:res.id},...res.data()})
          })  
          }) 
        }




      async  del(x)
        {
        console.log(x)
        
        
        let alert = this.alertController.create({
          message: 'Do you want to delete item from history?',
          buttons: [
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Yes',
              handler: () => {
                firebase.firestore().collection('ClientHistory').doc(x.id).delete().then(res=>{
                  console.log(res)
                })
              }
            }
          ]
        });
        (await alert).present();
        (await alert).onDidDismiss().then(val=>{
          this.hist();
        })
        
        
        
        }

}








