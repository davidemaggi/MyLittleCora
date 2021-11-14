import { Component, OnInit } from '@angular/core';
import { NfcService } from '../services/nfc.service';
import { ToastController } from '@ionic/angular';
import { nfcResult } from '../models/nfcResult.model';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(private nfcSrvice:NfcService,public toastController: ToastController) {


  }


  ngOnInit() {
    this.nfcSrvice.nfcRead.subscribe(res=>{
this.toastNfcRead(res);
      if(res.isOk){

      }else{
        
      }


    }
        
      

    );

}


async toastNfcRead(res:nfcResult){
  const toast = await this.toastController.create({
    message: 'Read Nfc: '+res.content,
    color:res.isOk() ? "success":"danger",
    duration: 2000
  });
  toast.present();
}


}
