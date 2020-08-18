import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {  NavParams, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public router:Router, 
    public alertCrtl: AlertController,
    public toastCtrl:ToastController,public loadingController:LoadingController) { }

  ngOnInit() {
  }
  user:any = {} 
  fun(user)
  {
  console.log(user)
  firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(async result => {
    console.log(result.user.emailVerified,'user logged in');

    

    
    if(result.user.uid )
    {
      this.router.navigateByUrl('home');
      const toast =  this.toastCtrl.create({
        message: 'Login Successful!',
        duration: 9000
      });
  
  (await toast).present()

     
    
    }



  {
  
  }
  }).catch(async error=> {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    console.log(error.message)

    const alert = await this.alertCrtl.create({
      header: 'Login Error!',
      message: error.message,
      buttons: ['Dismiss']
    });

    await alert.present();
    // let alert = this.alertCrtl.create({
    // title: errorCode,
    //   subTitle: errorMessage,
    //   buttons: ['Try Again']
    // })
    // alert.present();
   // ...
  });
  
  }
  
  register(){
    this.router.navigateByUrl('register')
  }

}
