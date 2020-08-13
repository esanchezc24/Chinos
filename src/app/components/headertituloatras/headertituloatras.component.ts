import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-headertituloatras',
  templateUrl: './headertituloatras.component.html',
  styleUrls: ['./headertituloatras.component.scss'],
})
export class HeadertituloatrasComponent implements OnInit {

  @Input() tituloatras:string;

  constructor() { }

  ngOnInit() {}

}
