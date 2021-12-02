import { Component, OnInit } from "@angular/core";
import { NfcService } from "../services/nfc.service";
import { ToastController } from "@ionic/angular";
import { nfcResult } from "../models/nfcResult.model";
import { SoundService } from "../services/sound.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  public readJson: object = {};

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
    console.log(res.getContent());
      this.readJson = res.getContent();

      this.toastNfcRead(res);
      if (res.isOk) {
        //this.soundService.playAudio("mucca_1.mp3")
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
