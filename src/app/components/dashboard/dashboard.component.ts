// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import * as feather from 'feather-icons';

declare const scrollReveal: any;

declare const feather: any;



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  ngOnInit(): void {
    // Call functions from external scripts
    scrollReveal();
    feather.replace();
  }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  
    
  
  

//   const body = document.querySelector("body");

// const Menu = {
//   open() {
//     document.querySelector(".mobile-menu").classList.add("active");
//     body.style.overflowY = "hidden";
//   },
//   close() {
//     document.querySelector(".mobile-menu").classList.remove("active");
//     body.style.overflowY = "inherit";
//   },
// };

}
