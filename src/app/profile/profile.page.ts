import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sim } from '@ionic-native/sim/ngx';
import { DeviceAccounts } from '@ionic-native/device-accounts/ngx';
import { AlldataService } from '../alldata.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
carrier
network
  constructor(public router:Router,private toastCtrl: ToastController,public alldata:AlldataService,private deviceAccounts: DeviceAccounts,private sim: Sim,private http: HttpClient) { 
    
    
    
    
    this.sim.getSimInfo().then(
      (info) => 
      
      {console.log('Sim info: ', info.cards[0].carrierName)
      this.network=info.cards[0].carrierName
    this.carrier="Enter Your "+info.cards[0].carrierName+" Number"
    },
      (err) => console.log('Unable to get sim info: ', err)
    );
    
    this.sim.hasReadPermission().then(
      (info) => console.log('Has permission: ', info)
    );
    
    this.sim.requestReadPermission().then(
      () => console.log('Permission granted'),
      () => console.log('Permission denied')
    );

  }

  ngOnInit() {

  }
  profile:any ={};
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }





  async    Register(profile){

        profile.email = this.alldata.useremail;
         profile.clientuid = this.alldata.clientuid;
       profile.creationdate =this.alldata.creationdate;
         console.log(profile)
      // this.profile =profile;
      console.log(profile.phoneNum)


      if(profile.name ==undefined)
{
  let toast = this.toastCtrl.create({
    message: 'Enter your name and surname.',
    duration: 3000,
    position: 'bottom'
  });


  (await toast).present();
}

else
if((profile.phoneNum).toString().length!=10 || profile.phoneNum ==undefined)
{

  let toast = this.toastCtrl.create({
    message: 'Invalid cellphone number length.',
    duration: 3000,
    position: 'bottom'
  });


  (await toast).present(); 
}

else{

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8' );

       

        console.log(this.profile)
      //  this.http.head("https://nathanaelbw.co.za/ussd/product.php", 'Access-Control-Allow-Origin: *')
          // return this.http.post('https://nathanaelbw.co.za/ussd/product.php',this.profile)
          this.http.post('https://nathanaelbw.co.za/ussd/product.php',this.profile).subscribe(async response =>{ 
            // this.rez.push(JSON.parse(response['_body']));
               console.log("line 135 ",response)
            
             this.router.navigateByUrl('home')
             const toast = await this.toastCtrl.create({
              message: 'Your registration was successful.',
              duration: 3000
            });
            toast.present();
            
              } )
        
          

         

    }
  }



}






