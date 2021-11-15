import { EventEmitter, Injectable } from "@angular/core";
import { NFC, Ndef } from "@ionic-native/nfc/ngx";
import { Platform } from "@ionic/angular";
import { nfcResult } from "../models/nfcResult.model";

@Injectable({
  providedIn: "root",
})
export class NfcService {
  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private platform: Platform
  ) {
    
    this.setup();
  }

  public nfcIsEnabled: boolean;

  private readerMode$;

  public nfcRead: EventEmitter<nfcResult> = new EventEmitter();

  async setup() {
    this.nfcIsEnabled = await this.nfc.enabled();

    if (this.platform.is("android") && this.nfcIsEnabled) {
      // Read NFC Tag - Android
      // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber

      let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V | this.nfc.FLAG_READER_NO_PLATFORM_SOUNDS;
      this.readerMode$ = this.nfc.readerMode(flags).subscribe(
        (tag) => this.nfcRead.emit(nfcResult.newSuccess(JSON.stringify(tag))),
        (err) => this.nfcRead.emit(nfcResult.newError(err))
      );
    }

    if (this.platform.is("ios") && this.nfcIsEnabled) {
      // Read NFC Tag - iOS
      // On iOS, a NFC reader session takes control from your app while scanning tags then returns a tag
      try {
        let tag = await this.nfc.scanNdef();
        this.nfcRead.emit(nfcResult.newSuccess(JSON.stringify(tag)));
      } catch (err) {
        this.nfcRead.emit(nfcResult.newError(err));
      }
    }
  }
}
