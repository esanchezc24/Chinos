import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-headermenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.scss'],
})
export class HeadermenuComponent implements OnInit {
  @Input() back: boolean;
  constructor() { }

  ngOnInit() {
  }

}
