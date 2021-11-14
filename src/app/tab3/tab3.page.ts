import { Component, OnInit } from '@angular/core';
import { NfcService } from '../services/nfc.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  constructor(private nfcSrvice:NfcService) {


  }


  ngOnInit() {
    this.nfcSrvice.nfcRead.subscribe(res=>{

      if(res.isOk){

      }else{
        
      }


    }
        
      

    );

}

}
