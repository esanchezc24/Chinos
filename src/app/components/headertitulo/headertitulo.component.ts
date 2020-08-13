import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-headertitulo',
  templateUrl: './headertitulo.component.html',
  styleUrls: ['./headertitulo.component.scss'],
})
export class HeadertituloComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
