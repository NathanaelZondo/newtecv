import { Component, OnInit } from '@angular/core';
import { AlldataService } from '../alldata.service';
import { ToastController,Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { DatabaseService, Dev } from '../../app/services/database.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage   {

item:any ={};
  pdfObj = null;
  constructor( private sqlite: SQLite,private db: DatabaseService,public loadingController: LoadingController,public toastController: ToastController,public data:AlldataService,public modalController: ModalController,private plt: Platform, public fileOpener: FileOpener,private file: File) {

    // this.plt.ready().then(() => {
    //   this.createDB();
    // }).catch(error => {
    //   console.log(error);
    // })


   }

 


 async delitem(item,index)
  {
console.log(parseFloat(item.price),index)
this.data.grocerytotal =Math.floor((this.data.grocerytotal-parseFloat(item.price))*100)/100
const toast = await this.toastController.create({
  message: item.productName +' removed.\nR'+item.price +' deducted from your total.',
  duration: 4000
});
toast.present();

this.data.grocerydata.splice(index,1);
this.data.grocerylength=this.data.grocerydata.length
  }






  close()
  {
console.log('close')
this.modalController.dismiss()
  }



 async createPdf() {


var shoppinglist =[];

for(let x =0;x<this.data.grocerydata.length;x++)
{
  
  
  
  

  shoppinglist.push([this.data.grocerydata[x].productName+'\t'+'R'+this.data.grocerydata[x].price+'\t'+this.data.grocerydata[x].shop]);
  console.log('shopping List',shoppinglist)

}



    var docDefinition = {
      content: [
        { text: 'Shopping List:', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'Your Budget: '+'R'+ this.data.budget.toString()+'\n \n' , style: 'subheader' },
 
      
    
 
 
        {
          ul: shoppinglist
          
        },
        { text: 'Total Cost: '+'R'+this.data.grocerytotal.toString(), style: 'subheader',alignment: 'right' }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0],
        
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);

    const toast = await this.toastController.create({
      message: 'Pdf successfully created...',
      duration: 2000
    });
    toast.present();

    toast.onDidDismiss().then(async res=>{
      this.downloadPdf()
      const loading = await this.loadingController.create({
        message: 'Downloading pdf...',
        duration: 4000,
        spinner:'crescent'
      });
      await loading.present();

      loading.onDidDismiss().then(res=>{
        
      })
      
    })

  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
  

  ngOninit()
  {
  
  }

  // createDB() {
  //   this.sqlite.create({
  //     name: 'Saved',
  //     location: 'default'
  //   })
  //     .then((db: SQLiteObject) => {
  //       this.databaseObj = db;
  //       this.createTable()
  //     })
  //     .catch(e => {
  //       alert("error " + JSON.stringify(e))
  //     });
  // }


  // createTable() {
  //   this.databaseObj.executeSql('CREATE TABLE IF NOT EXISTS History (pid INTEGER PRIMARY KEY, productName varchar(255),type varchar(255),price varchar(50),shop varchar(255))', [])
  //     .then(() => {
        
  //     })
  //     .catch(e => {
  //       alert("error " + JSON.stringify(e))
  //     });
  // }




  // databaseObj: SQLiteObject; // Database instance object
  // name_model:string = "Michael"; // Input field model
  // row_data: any = []; // Table rows




  // insertRow() {
  //   if (!this.name_model.length) {
  //     alert("Enter Name");
  //     return;
  //   }
  //   this.databaseObj.executeSql('INSERT INTO History (productName,price,shop,type) VALUES (\'Water\',\'200\'\,\'pnp\',\'bevz\')', [])
  //     .then(() => {
       
  //       this.getRows();
  //     })
  //     .catch(e => {
  //       alert("error " + JSON.stringify(e))

  //       this.createTable()
  //     });
  // }




  // getRows() {
  //   this.databaseObj.executeSql("SELECT * FROM History", [])
  //     .then((res) => {
  //       this.row_data = [];
  //       console.log(res.rows)

  //       if (res.rows.length > 0) {
  //         for (var i = 0; i < res.rows.length; i++) {
  //           this.row_data.push(res.rows.item(i));
  //           console.log(this.row_data)
  //         }
  //       }
  //     })
  //     .catch(e => {
  //       alert("error " + JSON.stringify(e))
  //     });
  // }








  //   deleteRows() {
  //     this.databaseObj.executeSql('DROP TABLE History ', [])
  //       .then((res) => {
  //         alert("Row Deleted!");
  //         this.getRows();
  //       })
  //       .catch(e => {
  //         alert("error " + JSON.stringify(e))
  //       });
  //   }






}









