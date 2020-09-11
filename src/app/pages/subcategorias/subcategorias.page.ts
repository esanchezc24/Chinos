import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, MenuController} from '@ionic/angular';
import {ParamsService} from "../../services/params.service";
import {LoadingService} from "../../services/loading.service";
import {FactoryService} from "../../services/factory.service";
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
    selector: 'app-subcategorias',
    templateUrl: './subcategorias.page.html',
    styleUrls: ['./subcategorias.page.scss'],
})
export class SubcategoriasPage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    category;
    products = [];
    filters: any = {limit: 0, per_page: 20};
    environment = environment;
    total;
    constructor(private paramsService: ParamsService,
                private loadingService: LoadingService,
                private http: FactoryService,
                private router: Router) {
    }

    ionViewWillEnter() {
        this.category = this.paramsService.getParams().category;
        this.initialLoad(true);
    }

    ngOnInit() {
    }

    private initialLoad(clear) {
        if (clear) {
            this.filters.limit = 0;
            this.products = [];
            if (this.infiniteScroll) {
                this.infiniteScroll.disabled = false;
            }

        }
        this.loadingService.presentLoading();
        this.http.setModule('products');
        this.filters.id_category = this.category.id
        this.http.get(this.filters).then((res: any) => {
            this.total = res.total;
            res.data.forEach((product, i) => {
                product.qty = 1;
                this.products.push(product);
            });
        }).finally(() => {
            this.loadingService.closeLoading();
        });
    }

    goDetail(product){
        const params = this.paramsService.getParams();
        params.product = product;
        params.urlBack = btoa(this.router.url);
        this.router.navigate(['/tabs/detalle']);
    }
    loadData(event) {
        if (this.products.length === this.total) {
            event.target.complete();
            this.infiniteScroll.disabled = true;
        } else {
            this.filters.limit += 20;
            this.initialLoad(false);
        }
        event.target.complete();
    }
}
