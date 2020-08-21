import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: true,
    spaceBetween: 10,
    speed: 1000
  };
  sliderProduct = {
    initialSlide: 0,
    slidesPerView: 2,
    autoplay: true,
    spaceBetween: 10,
    speed: 1500
  };
  constructor() { }

  ngOnInit() {
  }

}
