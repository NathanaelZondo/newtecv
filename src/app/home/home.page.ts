import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { LoadingController, ToastController,ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlldataService } from '../alldata.service';
import { ModalController } from '@ionic/angular';

import { Subscription, observable,timer } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
showme: boolean=true;
  hideMe: boolean = false;
text = "Email Validation"
profile:any={}
  shomi()
  {
    this.showme =false
    this.hideMe =true
    this.text = "Call Validation"
  }

  hideme(){

  
    this.showme =true
    this.hideMe =false
    this.text = "Email Validation"
  }


  constructor(public toastController: ToastController,public alldata:AlldataService,public router:Router,public actionSheetController:ActionSheetController,public toastcontroller:ToastController, public modal:ModalController,public data:AlldataService,public alertController: AlertController,public loadingController:LoadingController) {
  
   firebase.firestore().collection('employeesprofile').where('empUid','==',this.alldata.clientuid).get().then(res=>{
     res.forEach(val=>{
       console.log(val.data())
       this.profile=val.data()
     })
   })
   
  }






  scode= Math.floor(Math.random() * 100000);
  time =new Date().toLocaleTimeString().toString();
  date=new Date().toLocaleDateString().toString();


  res:any ={}

  cval(x)
  {
 console.log(x.cell)
         
    firebase.firestore().collection('cval').where('cell','==',x.cell).get().then(res=>{
      res.forEach(async val=>{
        console.log(val.data())

        this.res=val.data() 
      
        const alert = await this.alertController.create({
          header:  'Client info was found.',
          subHeader: 'Secret Code: '+this.res.code,
          backdropDismiss:false,
          message: 'Cell:'+this.res.cell+'\nDate:'+this.res.date+'\nTime:'+this.res.time,
          buttons: ['OK']
        });
    
        await alert.present();


        firebase.firestore().collection('cval').doc(val.id).update(
          {empCompany:this.profile.empCompany,empDepartment:this.profile.empDepartment}
        ).then(async res=>{

          const toast = await this.toastController.create({
            message: 'The client is now able to see the name of the company and your department.',
            duration: 3000
          });
          toast.present();
        })

      })
    })    
  }

eco:any={}
cco:any={};
 async eval(x)
  {

    
    const alert = await this.alertController.create({
      backdropDismiss:false,
      header: 'Confirm!',
      message: 'Are you sure '+x.email+' is the correct email address?',
      buttons: [
        {
       
          text: 'Edit',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');

            let date =new Date().toLocaleDateString()
          console.log(date,this.profile.empCompany)
            firebase.firestore().collection('eval').add({companyName: this.profile.empCompany,empDepartment: this.profile.empDepartment,code:this.scode.toString(),todate:date,email:x.email,time:new Date().toLocaleTimeString().toString()}).then(async res=>{

              const toast = await this.toastController.create({
                message: 'Email code was successfully uploaded.',
                duration: 5000
              });
              toast.present();
            })
          }
        }
      ]
    });

    await alert.present();

  
  
 
  
    
  }




    
     




    }

  
    