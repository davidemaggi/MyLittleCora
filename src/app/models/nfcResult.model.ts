import { resultCode } from "./enums";

export class nfcResult {
    code: resultCode;
    msg: string="";
    content: string="";

    constructor(){}

    public isOk():boolean{

        return this.code==resultCode.Success;
    }


    public getContent(){

        return JSON.parse(this.content);

    }

    public static newSuccess(json:string){

       let ret=new nfcResult();

       ret.code=resultCode.Success;
       ret.content=json;


       return ret;
    }

    public static newError(msg:string=""){

        let ret=new nfcResult();
 
        ret.code=resultCode.Error;
        ret.msg=msg;
 
        return ret;
     }

     
    
}


