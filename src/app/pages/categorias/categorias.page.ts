import { Component, OnInit } from '@angular/core';
import {FactoryService} from "../../services/factory.service";
import {LoadingService} from "../../services/loading.service";
import {environment} from "../../../environments/environment";
import {ParamsService} from "../../services/params.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categories = [];
  environment = environment;
  constructor(
      private http: FactoryService,
      private loadingService: LoadingService,
      private paramsService: ParamsService,
      private router: Router
  ) { }

  ngOnInit() {
    this.initialLoad();
  }
  private initialLoad() {
    this.loadingService.presentLoading();
    this.http.setModule('categories');
    this.http.get().then((res: any) => {
      this.categories = res.data;
    }).finally(() => {
      this.loadingService.closeLoading();
    });
  }
  goProducts(category){
      const params = this.paramsService.getParams();
      params.category = category;
      this.router.navigate(['/tabs/subcategorias']);

  }
}
