import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import {  NavParams, AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public router:Router, 
    public alertCrtl: AlertController,
    public toastCtrl:ToastController,public loadingController:LoadingController) { }

  ngOnInit() {
  }
  user:any = {} 
  fun(user)
  {
  console.log(user)
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(result => {
    console.log(result.user.uid,result.user.email,'user registered in');

 
    if(result.user.uid >"")
    {
      const toast =  this.toastCtrl.create({
        message: 'Registration Successful!',
        duration: 9000
      });
  
  
     this.router.navigateByUrl('profile') 
    
    }
  {
  
  }
  }).catch(async error => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    const alert = await this.alertCrtl.create({
      header: 'Registration Error!',
      message: error.message,
      buttons: ['Dismiss']
    });
    alert.present()
  });
  
  }
  
  login(){
    
    this.router.navigateByUrl('login')
  }

}
