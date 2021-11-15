import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }


  
  public playAudio(f:string){
    let audio = new Audio("assets/audio/"+f);
    
    audio.load();
    audio.play();
  }
 



}
