import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  step = {
    step1: false,
    step2: false,
    step3: false,
    step4: false,
    step5: false 
  }


  ngOnInit(){
    setTimeout(()=>{
      this.step.step1 = true
    },100) 
    setTimeout(()=>{
      this.step.step2 = true
    },300)
    setTimeout(()=>{
      this.step.step3 = true
    },500)
    setTimeout(()=>{
      this.step.step4 = true
    },700)
    setTimeout(()=>{
      this.step.step5 = true
    },900)
  }
}
