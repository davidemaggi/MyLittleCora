import { Component, OnInit } from "@angular/core";
import { NfcService } from "../services/nfc.service";
import { ToastController } from "@ionic/angular";
import { innerNfcContent, nfcResult } from "../models/nfcResult.model";
import { SoundService } from "../services/sound.service";
import { mlcData } from "../models/mlcData.model";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  public readJson: innerNfcContent;

  constructor(
    private nfcSrvice: NfcService,
    private toastController: ToastController,
    private soundService: SoundService
  ) {}

  ngOnInit() {
    this.nfcSrvice.nfcRead.subscribe((res) => {
      this.receivedNfc(res);
    });
  }


  receivedNfc(res:nfcResult){
    res.printContent()
      

      this.toastNfcRead(res);
      if (res.isOk) {
        this.readJson = res.getContent();
        let mlc=<mlcData>this.readJson.getMessage("mlcData",true);
        this.soundService.playAudio(mlc.audio);
      } else {
      }
  }


  async toastNfcRead(res: nfcResult) {
    const toast = await this.toastController.create({
      message: "Read Nfc: " + res.content,
      color: res.isOk() ? "success" : "danger",
      duration: 2000,
    });
    toast.present();
  }
}
