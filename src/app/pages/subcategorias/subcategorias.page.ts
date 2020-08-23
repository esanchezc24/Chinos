import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {ParamsService} from "../../services/params.service";
import {LoadingService} from "../../services/loading.service";
import {FactoryService} from "../../services/factory.service";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-subcategorias',
    templateUrl: './subcategorias.page.html',
    styleUrls: ['./subcategorias.page.scss'],
})
export class SubcategoriasPage implements OnInit {
    category;
    products = [];
    filters: any = {};

    constructor(private paramsService: ParamsService,
                private loadingService: LoadingService,
                private http: FactoryService,
                private router: Router) {
    }

    ionViewWillEnter() {
        this.category = this.paramsService.getParams().category;
        this.initialLoad();
    }

    ngOnInit() {
    }

    private initialLoad() {
        this.loadingService.presentLoading();
        this.http.setModule('products');
        this.filters.id_category = this.category.id
        this.http.get(this.filters).then((res: any) => {
            this.products = res.data;
            this.products.forEach((product, i) => {
                this.products[i].qty = 1;
            });
        }).finally(() => {
            this.loadingService.closeLoading();
        });
    }

    goDetail(product){
        const params = this.paramsService.getParams();
        params.product = product;
        this.router.navigate(['/tabs/detalle']);
    }

}
