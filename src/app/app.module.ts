import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from '@ionic-native/file/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListPage } from './list/list.page';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { FormsModule } from '@angular/forms';
import { Sim } from '@ionic-native/sim/ngx';
import { firebaseConfig} from '../app/env';
import { HttpClientModule } from '@angular/common/http';
import { DeviceAccounts } from '@ionic-native/device-accounts/ngx';
@NgModule({
  declarations: [AppComponent,ListPage],
  entryComponents: [ListPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Sim,
    SQLite,
    SQLitePorter,
    File,
    HttpClientModule,
    FormsModule,
    FileOpener,
    DeviceAccounts,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
