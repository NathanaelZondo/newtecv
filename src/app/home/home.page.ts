import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { LoadingController, ToastController,ActionSheetController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AlldataService } from '../alldata.service';
import { ModalController } from '@ionic/angular';
import {ListPage} from '../list/list.page';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
// import 'moment/locale/en-au';
import { Subscription, observable,timer } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

fruit =[];
veg =[];
sub : Subscription
shoppinglist:any;
selectedshop;
  constructor(public alldata:AlldataService,public router:Router,public actionSheetController:ActionSheetController,private http: HttpClient,public toastcontroller:ToastController,private sqlite: SQLite, public modal:ModalController,public data:AlldataService,public alertController: AlertController,public loadingController:LoadingController) {
  this.checkprofile()
   
   
  }






  scode= Math.floor(Math.random() * 100000);
  time =new Date().toLocaleTimeString().toString();
  date=new Date().toLocaleDateString().toString();
  phoneable =false;
  emailable =true;





k
  rez =[];

  cval()
  {
  
  console.log("code",this.scode);
  console.log("Date",new Date().toLocaleDateString().toString())
  console.log("Time",new Date().toLocaleTimeString().toString())

  let info ={};
   info = {cell:"0607854002",clientuid:this.alldata.clientuid,code:this.scode,date:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString().toString()};
  
  
  var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json; charset=utf-8' );
  
      // let options = new RequestOptions({ headers: headers });
  
  
     this.http.head("https://nathanaelbw.co.za/ussd/appsubmitcode.php", )
         this.http.post('https://nathanaelbw.co.za/ussd/appsubmitcode.php',info).subscribe(response =>{ 
      // this.rez.push(JSON.parse(response['_body']));
         console.log("line 135 ",response)
         this.presentActionSheet(1)
        //  if(this.found[0].name==null ||this.found[0].phoneNum==null)
        //  {
       
        //  }
       
      
        } )
  
    
         
        
  }

eco:any={}

  eval(x)
  {
  x={ecode:x.x}
    console.log(x)
  
    let info = {clientuid:"53oN7QL8s8Oc0WJ74fl0uMA8saV2",date:new Date().toLocaleDateString().toString(),time:new Date().toLocaleTimeString().toString()};
  
  
    // let alert = this.alertCrtl.create({
    //   title: this.scode.toString(),
    //     subTitle: "Was found on the system.",
    //     cssClass:'dark',
    //     buttons: ['Done']
    //   })
    //   alert.present();
  
    
  
    var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json; charset=utf-8' );
  
    
  
  
     this.http.head("https://nathanaelbw.co.za/ussd/appsubmitecode.php")
         this.http.post('https://nathanaelbw.co.za/ussd/appsubmitecode.php',x).subscribe(async response =>{ 
       let r:any =response
         console.log("line 113 ",r.data)
      
         if(r.data ==null)
         {
           let status ="Code not found";
          let alert = this.alertController.create({
            header: "The code \'" +x.ecode + "\' was not found on our system.",
            buttons: ['Dismiss']
          });
     (await alert).present()
      
        
            firebase.firestore().collection('ClientHistory').add({...x,...info}).then(val=>{
              console.log(val)
            })
            firebase.firestore().collection('OurHistory').add({...x,...info}).then(val=>{
              console.log(val)
              // this.hist();
            })
          }else
          {
            x.status ="Code found";
            let alert = this.alertController.create({
            
              header: "The code \'" +x.ecode + "\' was found on our system.",
              buttons: ['Dismiss']
            });
           (await alert).present();
        
              firebase.firestore().collection('ClientHistory').add({...x,...info}).then(val=>{
                console.log(val)
              });
              firebase.firestore().collection('OurHistory').add({...x,...info}).then(val=>{
                console.log(val)
                this.hist();
              });
          }
        })}

history =[]
        hist()
        {
          this.history =[];
          firebase.firestore().collection('ClientHistory').where('clientuid',"==","53oN7QL8s8Oc0WJ74fl0uMA8saV2").orderBy('time', 'desc').get().then(val=>{
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



       async  presentActionSheet(x) {

        const actionSheet = await this.actionSheetController.create({
          header: 'The code that the caller must give you is '+this.scode+'?',
          buttons: [ 
        {
            text: 'Finish',
            icon: 'checkmark-done-outline',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');

this.presentAlert2()
        
                              
            }
          }]
        });
        await actionSheet.present();
      }






      async presentAlert1(x) {




        this.scode= Math.floor(Math.random() * 100000);
        const toast = this.toastcontroller.create({
          message: 'Code has changed to '+this.scode+'.',
          duration: 10000,
          showCloseButton: true
          
        });
        (await toast).present();

     
        // firebase.firestore().collection('ClientHistory').add(x).then( async val=>{
        //   console.log(val)
        // })
        // firebase.firestore().collection('OurHistory').add(x).then( async val=>{
        //   console.log(val)
        // })
      
      }

      async presentAlert2() {
        let alert = this.alertController.create({
            header: "Did the caller manage to give you the code?",
              subHeader: this.scode.toString(),
              cssClass: 'dark',
              buttons: [ {
                text: 'No',
                role: 'cancel',
                handler: async () => {
                  const toast = this.toastcontroller.create({
                    message: 'Validation code \''+this.scode+ '\' has not changed.',
                    duration: 10000,
                    showCloseButton: true
                    
                  });
                  (await toast).present()
                  ;(await toast).onDidDismiss().then(res=>{
                    console.log("dismissed")
                  })
                }
              },
              {
                text: 'Yes',
                handler: async () => {
                 this.presentAlert1(1)
                }
              }     
            ]
            })

            ;(await alert).present()      
                  
      }


   profile()
  {
    this.router.navigateByUrl('profile')
  }


  checkprofile()
  {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json; charset=utf-8' );

    


   this.http.head("https://nathanaelbw.co.za/ussd/json.php")
   console.log(this.alldata.clientuid)
   this.http.post("https://nathanaelbw.co.za/ussd/json.php",{clientuid:this.alldata.clientuid}).subscribe(async res =>{
     console.log(res)
     let rezz:any =res
     const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner:'bubbles',
      duration: 3000
    });
    await loading.present();

    
    loading.onDidDismiss().then(async res=>{
      if(rezz.phoneNum ==null)
      {
       const toast = await this.toastcontroller.create({
         message: 'Create a profile to proceed.',
         duration: 2000
       });
       toast.present();
 this.router.navigateByUrl('profile')
 
      }
      
    })
   
   })
  }

    }

  
    