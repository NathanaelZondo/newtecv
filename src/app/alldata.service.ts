import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AlldataService {

  constructor(public alertController: AlertController) { 
 
  }

useremail
clientuid
creationdate
userprofile:any ={}
fewds()
{
  // console.log(email,clientuid,cdate)
     console.log(this.useremail,
      this.clientuid,
        this.creationdate )
}

}
