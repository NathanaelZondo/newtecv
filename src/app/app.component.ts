import { Component } from '@angular/core';
import { firebaseConfig} from '../app/env';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { AlldataService } from './alldata.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(public router:Router,public alldata:AlldataService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingController: LoadingController
  ) {
    firebase.initializeApp(firebaseConfig)
    this.presentLoading()
 
    
    
    this.initializeApp();
  }

  async presentLoading() {
    firebase.auth().onAuthStateChanged(user=> {
      if (user) {
        // User is signed in.
        console.log(user)
        if(user.emailVerified==true )  
    {
      this.router.navigateByUrl('home')
      console.log("Email verified")

    }
    else{
      this.router.navigateByUrl('login')
  
      console.log("Email not verified")
      // firebase.auth().sendem
      user.sendEmailVerification().then(res=>{
        console.log(res)
      })
    }
        this.alldata.useremail=user.email;
        this.alldata.clientuid =user.uid;
        this.alldata.creationdate=user.metadata.creationTime
this.alldata.fewds()

        //  this.alldata.fewds(user.email,user.uid,user.metadata.creationTime)
        // console.log(user.metadata.creationTime)
        
      } else {
        // No user is signed in.
        console.log("no user")
      }
    });


    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  
  
   
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
}
