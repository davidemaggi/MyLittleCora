import { resultCode } from "./enums";

export class nfcResult {
  code: resultCode;
  msg: string = "";
  content: string = "";

  constructor() {}

  public isOk(): boolean {
    return this.code == resultCode.Success;
  }

  public getContent(): innerNfcContent {
    let ret: innerNfcContent = new innerNfcContent();
    let tmp = JSON.parse(this.content);

    ret.canMakeReadOnly = tmp.canMakeReadOnly;
    ret.isWritable = tmp.isWritable;
    ret.maxSize = tmp.maxSize;
    ret.ndefMessage = tmp.ndefMessage;
    ret.techTypes = tmp.techTypes;
    ret.type = tmp.type;

    return ret;
  }

  public printContent() {
    let content: innerNfcContent = this.getContent();
    if (content.ndefMessage) {
      content.ndefMessage.forEach((message) => {
        console.log(message);
        console.log(
          `${String.fromCharCode.apply(
            null,
            message.type
          )} | ${String.fromCharCode.apply(null, message.payload)}`
        );
      });
    }
  }

  public static newSuccess(json: string) {
    let ret = new nfcResult();

    ret.code = resultCode.Success;
    ret.content = json;

    return ret;
  }

  public static newError(msg: string = "") {
    let ret = new nfcResult();

    ret.code = resultCode.Error;
    ret.msg = msg;

    return ret;
  }
}

export class innerNfcContent {
  public canMakeReadOnly: boolean;
  public isWritable: boolean;
  public maxSize: number;
  public ndefMessage: Array<nfcMessage> = new Array<nfcMessage>();
  public techTypes: Array<string>;
  public type: string;

  public getMessage(code: string, asJson = false) {
    if(this.ndefMessage){
    for (let message  of this.ndefMessage) {
      let tmpType = `${String.fromCharCode.apply(
        null,
        message.type
      )}`.toLowerCase();

      console.log(`${tmpType} == ${code.toLowerCase()}`);
      if (tmpType == code.toLowerCase()) {
        let payload = String.fromCharCode.apply(null, message.payload);
        console.log(payload);

        return asJson ? JSON.parse(payload) : payload;
      }
    }
  }
    return asJson ? null : "";
  }
}

export class nfcMessage {
  public tnf: number;
  public type: Uint8Array;
  public id: Uint8Array;
  public payload: Uint8Array;
}
