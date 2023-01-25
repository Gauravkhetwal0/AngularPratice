import { Component } from '@angular/core';
import { HostListener } from "@angular/core"; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
}) 


export class AppComponent {
  pageTitle = 'Acme Product Management';
  hidden : boolean = false;;
  screenHeight: any;
    screenWidth: any;

    constructor() {
        this.getScreenSize();
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize() {
          // this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          // console.log(this.screenHeight, this.screenWidth);
    }
  toggleMenu():void{
    // if(this.screenWidth < 750)
    //   this.hidden = !this.hidden;
    this.hidden = !this.hidden;
  }
}
