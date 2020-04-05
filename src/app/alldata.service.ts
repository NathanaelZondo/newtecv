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
fewds(em,clientuid,cdate)
{
  // console.log(email,clientuid,cdate)
     this.useremail = em;
      this.clientuid = clientuid;
        this.creationdate =cdate;
}

}
