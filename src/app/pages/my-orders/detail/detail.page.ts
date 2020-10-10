import { Component, OnInit } from '@angular/core';
import {ParamsService} from "../../../services/params.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  order;
  constructor(
      private paramsService: ParamsService,
  ) { }

  ngOnInit() {
    this.order = this.paramsService.getParams();
  }

}
