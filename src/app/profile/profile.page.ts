import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  profile:any ={};
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }





      Register(profile){

      //   profile.email = this.slist.email;
      //   profile.clientuid = this.slist.uid;
      //   profile.creationdate =this.slist.creationtime;
         console.log(profile)
      // this.profile =profile;



      if(profile.name ==undefined)
{
  // let toast = this.toastCtrl.create({
  //   message: 'Enter your name and surname',
  //   duration: 3000,
  //   position: 'bottom'
  // });


  // toast.present();
}

else
if((profile.phoneNum).toString().length!=10 || profile.phoneNum ==undefined)
{

  // let toast = this.toastCtrl.create({
  //   message: 'invalid cellphone number length',
  //   duration: 3000,
  //   position: 'bottom'
  // });


  // toast.present(); 
}

else{

        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json; charset=utf-8' );

       

        console.log(this.profile)
      //  this.http.head("https://nathanaelbw.co.za/ussd/product.php", 'Access-Control-Allow-Origin: *')
          // return this.http.post('https://nathanaelbw.co.za/ussd/product.php',this.profile)
          this.http.post('https://nathanaelbw.co.za/ussd/product.php',this.profile).subscribe(response =>{ 
            // this.rez.push(JSON.parse(response['_body']));
               console.log("line 135 ",response)
            
              //  if(this.found[0].name==null ||this.found[0].phoneNum==null)
              //  {
             
              //  }
             
            
              } )
        
          

         

    }
  }



}






